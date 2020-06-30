import React, { useRef, useState, useContext } from "react";

import { select,
         hierarchy, 
         tree, 
         linkVertical, 
         zoom, 
         zoomTransform
} from "d3";
// TODO: either explicitly specify imports or import entire module, not both.
import * as d3 from "d3";

// useDidMountEffect lets you specify a useEffect hook that fires if anything in the dependency
// array changes but NOT on initial render.
import useDidMountEffect from "../../utils/useDidMountEffect";
import useResizeObserver from "../../utils/useResizeObserver";

import {
  generateNodeSize,
  nodeSeparation,
  staggerText,
  dynamicTextSize,
  wrap,
  presentToolTip,
  hideToolTip,
  hideToolTipInstant,
  preProcessNodeLabel,
  colourNode,
  removeNodeColour,
} from "../../utils/treeChartD3Utilities";

import Tooltip from "../Tooltip/Tooltip";

import { TreeChartWrapperDiv } from "./tree-chart-d3-styles";

import { D3Context } from "../../contexts/D3Context";

function TreeChartD3() {
  // Get the d3 state and action dispatcher
  const { d3State, dispatch } = useContext(D3Context);
  // Set up refs
  const svgRef = useRef();  // hold reference to the SVG element that d3 will render its content into
  const wrapperRef = useRef();  // hold reference to the div element that contains the svg (used for resizing)
  // Use resize observer so that dimensions will change on browser window resize
  const dimensions = useResizeObserver(wrapperRef);
  // Initial margins
  const margin = {top: 20, right: 120, bottom: 20, left: 120};
  const duration = 750;  // duration is 750 ms
  // Create link generator function
  const linkGenerator = linkVertical()
  .x(link => link.x)
  .y(link => link.y);
  // Hold a reference to the SVG returned by this component (i.e. the one referenced by svgRef). Append
  // a group tag and offset it by the margins.
  const svg = select(svgRef.current)
    // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  // Apply zoom handling to the parent container group.
  svg
    .call(
      zoom().on("zoom", () => {
        const zoomState = zoomTransform(svg.node())
        svg.select("#zoomContainer")
        .attr("transform", zoomState.toString())
      })
    )
  
  /**
   * The hand-off point between react and d3 is here; we let d3 take control of the updating pattern inside
   * of the useEffect hook.
   */
  useDidMountEffect(() => {
    console.log("useDidMountEffect ran")
    // Get width and height of the tree based on the window size/size of bounding rectangle.
    var { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();
    // Apply margins to the initial height and width (TODO: dynamically pick margins to fit window size)
    width = width - margin.right - margin.left;
    height = height - margin.top - margin.bottom;
    // Variables to hold animation duration and node counter
    var i=0;
    
    // Create the tree layout; set nodeSize so that it is set dynamically based on the width and height of the SVG container.
    // Note: when setting nodeSize instead of size (they are mutually exclusive; one overrides the other),
    // the root node is anchored at coordinate (0,0) by default.
    // console.log("layout is ", generateNodeSize(width, height));
    const treeLayout = tree()
      .nodeSize(generateNodeSize(width, height))
      .separation(nodeSeparation);

    // Note: the data are transformed with d3's hierarchy() function outside of this component and the transformed
    // data are stored in the parent's state. The reason for this is to keep track of the tree chart's state outside
    // of this component.
    const root = d3State.dataRoot;
    // Set initial position of the root
    root.x0 = width/2;
    root.y0 = 0;
    // If there is no nodeExpansionPath prop, then open to the root by default; otherwise expand to the searched
    // node.
    if (d3State.nodeExpansionPath) {
      expandToNode(d3State.nodeExpansionPath, root, treeLayout, width, height, i);
    } else {
      update(root, root, treeLayout, width, height, i);
    }
  }, [dimensions,
      d3State.nodeExpansionPath,
      d3State.dataRoot]);
  
  /**
   * 
   * @param {*} source 
   * @param {*} root
   * @param {int} i A global variable keeping track of the number of nodes. Used to assign ID to nodes.
   */
  function update(source, root, treeLayout, width, height, i) {
      console.log("root is ", root)
      // The treeLayout enriches the root with x and y coordinates
      treeLayout(root)
      // Get the nodes and links (edges) of the subtree rooted at root.
      const nodes = root.descendants(), links = root.links();
      // Translate each x coordinate so that it is centered with respect to the svg
      nodes.forEach(function(d) {
        // When using nodeSize, the root is anchored at (0,0), so we need to shift all x coords by width/2
        d.x = d.x + (width + margin.left + margin.right)/2;
        // Normalize for fixed-depth; also need to shift the nodes down
        d.y = d.depth * 250 + height*0.20;
      });
      // Update the nodes; start by storing a selector for all elements bound to the nodes array.
      const node = svg.select("#parentContainer").selectAll("g.node")
        .data(nodes, function(d) {
          if (d.id) {
            return d.id;
          } else {
            dispatch({type: "SET_DATA_IDENTITY"});
            return (d.id = ++d3State.dataIdentity);
          }
        })
      // Enter new nodes at the parent's previous position
      const nodeEnter = node.enter().append("g")
      .attr("class", "node")
      // Add an "entering" class so we can prevent these nodes from having the mouseover callback applied while they are animating in.
      .classed("entering", true)
      .attr("transform", function(d) { return "translate(" + source.x0 + "," + source.y0 + ")"; })
      // Append a circle SVG to the set of entering elements. Node that each element of nodeEnter is its own group
      // container that will hold a circle and a text element.
      nodeEnter.append("circle")
      .attr("r", 1e-6)  // Node initializes with very small size.
      // nodes are white if leaf and light blue otherwise.

      // Append the text in the name field to each node (TODO: this should respond to the treechart layout in a more sophisticated way)
      nodeEnter.append("text")
      .attr("y", staggerText)
      .attr("dy", ".20em")
      .attr("text-anchor", function(d) {
        // Stagger labels based on odd/even
        return d.depth === 0 ? "middle" : "start"; 
      })
      .text(function(d) {
          // The function that returns the text for the labels of each node goes here
          return preProcessNodeLabel(d.data.name); 
      })
      .style("fill-opacity", 1e-6);
      
      // Apply a transition to all updating nodes. All entering nodes have been set up so that the transition will
      // animate them to their desired position; all existing nodes will remain in place.
      const nodeUpdate = nodeEnter.merge(node)
        .on("mouseover", function(d, i, nodes){
          // we only want to run this callback if the node does not have the class "entering" or "exiting".
          if (
            (!d3.select(this).classed("entering")) && 
            (!d3.select(this).classed("exiting")) &&
            (!d3.select(this).classed("expanding"))
            ) {
            // Set the position of the tooltip to be next to the hovered node on the d3 visualization
            dispatch({
              type: "SET_TOOLTIP_COORDINATES",
              tooltipCoordinates: {
                xScale: d.x-25,
                yScale: d.y+25,
              },
              tooltipHoveredNode: d,
            });
            presentToolTip(d, i, nodes);
            colourNode(d, i, nodes);
          }
        })
        // On mouseout, we want to check if the tooltip is hovered over before making it disappear.
        .on("mouseout", function(d, i, nodes) {
          // Define the circle's object properties outside the scope of the tooltip callback functions
          const dCircle = d;
          const iCircle = i;
          const nodesCircle = nodes;
          // Remove the node's colouring
          removeNodeColour(d, i, nodes);
          // Get a selection on the tooltip
          let tooltip = d3.select("#TooltipID");
          // Assign mouseover and mouseout handler functions
          tooltip
          .on("mouseover", function() {
            tooltip.transition().style("opacity", 1);
            // Highlight the circle when hovering over the tooltip
            colourNode(dCircle, iCircle, nodesCircle);
          })
          .on("mouseout", function() {
            // Remove the circle's colour when mousing out from the tooltip
            removeNodeColour(dCircle, iCircle, nodesCircle);
            tooltip
              .transition()
              .duration(1000)
              .style("opacity", 0)
              // When the transition out is over, reset the coordinates and hovered node so it doesn't re-appear
              // if the user hovers over the area that it previously appeared
              .on("end", function() {
                dispatch({
                  type: "SET_TOOLTIP_COORDINATES",
                  tooltipCoordinates: {
                    xScale: -100,
                    yScale: -100,
                  },
                  tooltipHoveredNode: null,
                });
              }); 
          });
          // If no mouseover event on tooltip, then fade away
          tooltip.transition()
            .duration(1000)
            .style("opacity", 0)
            // When the transition out is over, reset the coordinates and hovered node so it doesn't re-appear
            // if the user hovers over the area that it previously appeared
            .on("end", function() {
              // Remove the node's colour when the tooltip fades away
              removeNodeColour(dCircle, iCircle, nodesCircle);
              dispatch({
                type: "SET_TOOLTIP_COORDINATES",
                tooltipCoordinates: {
                  xScale: -100,
                  yScale: -100,
                },
                tooltipHoveredNode: null,
              });
            });
        });
      
      nodeUpdate
        .transition()
        .duration(duration)
        // All entering nodes are initialized at the position of their parent (root is initialized at its own position),
        // so this transformation translates them from (x0, y0) to (x, y) in `duration` amount of time.
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .on("end", function() {
          // When the transitions are done, need to (1) set the expanding flag on the clicked node to false, and (2) set the
          // entering class on the new nodes to false.
          d3.selectAll(".expanding").classed("expanding", false);
          d3.select(this).classed("entering", false);
        });
      // Once the transition is complete, the set of circles in the updating group should arrive at the below final state.
      nodeUpdate.select("circle")
        .on("click", function(d) {
          let boundClick = click.bind(this);
          boundClick(d, root, treeLayout, width, height, i);
        })
        .attr("r", 15)
        .style("fill", function(d) {
          if (d.terminalNode) {
            return "rgba(219, 0, 106, 0.75)";
          } else {
            return d._children ? "#eee" : "#fff";
          }
          })
        .style("stroke", function(d) {
          if (d.terminalNode) {
            return "#dc006c";
          } else {
            return "#282828";
          }
          })
      
      // Check if text elements have the "text-wrapped" class applied already; if not, apply the transformation
      // and then class those elements as "text-wrapped"
      nodeUpdate.select("text")
        // We only want to apply wrapping to elements that have not already been wrapped.
        .filter(function() {
          // console.log(this.classList)
          if (!this.classList.contains("text-wrapped")) {
            return this;
          }
        })
        .call(wrap, generateNodeSize(width, height)[0]*0.95)
        .classed("text-wrapped", true)
      // Once the transition is complete, the set of text elements in the updating group should arrive at the below final state.
      nodeUpdate.select("text")
        .style("font-size", dynamicTextSize)
        .style("fill-opacity", function(d, i, nodes) {
          // console.log(d)
          // console.log(nodes[i].children)
          return 1;
        });
      
      // Apply transition to the exiting nodes.
      const nodeExit = node.exit()
        // Apply an exiting class so that mouseover events cannot fire while the node is exiting. These nodes are all removed from
        // the DOM, so no need to remove exiting class.
        .classed("exiting", true)
        .transition()
        .duration(duration)
        .attr("transform", function(d) {return "translate(" + source.x + "," + source.y + ")"; })
        .remove();
      
      nodeExit.select("circle")
        .attr("r", 1e-6);

      nodeExit.select("text")
        .style("fill-opacity", 1e-6);

      // Apply the links
      const link = svg.select("#parentContainer").selectAll("path.link")
        .data(links, function(d) { return d.target.id })
      
      // Enter new links at the previous parent's position. For every element in the link selection, insert
      // a path element; all path elements will be inserted before the subsequent group elements. These links
      // will enter at their parent's previous position
      const linkEnter = link.enter().insert("path", "g")
        .attr("id", function(d) {
          return "target" + d.target.id.toString()
        })
        .attr("class", "link")
        .attr("d", function(d) {
          // console.log("link generated")
          var o = {x: source.x0, y: source.y0};
          return linkGenerator({source: o, target: o});
        })
      // Transition the links to their new position
      linkEnter.merge(link)
        .transition()
        .duration(duration)
        .style("stroke", function(d) {
          if (d.target.onSearchPath) {
            return "rgba(219, 0, 106, 0.5)";
          } else {
            return "#ccc";
          }
        })
        .style("stroke-width", function(d) {
          if (d.target.onSearchPath) {
            return "2px";
          } else {
            return "1px";
          }
        })
        .attr("d", linkGenerator);
      
      // Transition exiting nodes to the parent's new position.
      link.exit().transition()
        .duration(duration)
        .attr("d", function(d) {
          var o = {x: source.x, y: source.y};
          return linkGenerator({source: o, target: o});
        })
        .remove();

      // Stash the old node positions for transition
      nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
      });
  }
    
  /**
   * The callback for when a click event is registered on an org chart node.
   * @param {*} d TODO
   */
  function click(d, root, treeLayout, width, height, i) {
    // Label the clicked node as "expanding" so it doesn't interfere with the tooltip animation
    d3.select(this.parentNode).classed("expanding", true)
    // hide tooltip if it is showing
    hideToolTipInstant()
    if (d.children) {
    d._children = d.children;
    d.children = null;
    } else {
    d.children = d._children;
    d._children = null;
    }
    // Update the state
    // setData(root)
    update(d, root, treeLayout, width, height, i);
  }

  /**
   * The callback for when a node expansion path is passed to this component (i.e. when a user submits a 
   * search and clicks a result they want to see expanded in the tree).
   * @param {Array} expansionPath An array of ints containing the path to the target node starting at the root.
   */
  function expandToNode(expansionPath, root, treeLayout, width, height, i) {
    // Starting at the specified child of the root node, we want to expand all children along expansionPath. We
    // know that root is expanded to immediate children by default, so children will not be null.

    var currentNode = root.children[expansionPath[0]];
    console.log("current node is ", currentNode)
    // TODO: need way to flag nodes on the expanded path.
    for (var j = 1; j < expansionPath.length; j++) {
      // Give currentNode a property to indicate that it was on the search path
      currentNode.onSearchPath = true;
      // Expand the current node
      expandSingle(currentNode)
      // Update currentNode by taking the next step in the path
      currentNode = currentNode.children[expansionPath[j]];
    }
    // Give the final node the onSearchPath property
    currentNode.onSearchPath = true;
    // Label the final node on the search path
    currentNode.terminalNode = true;
    // Note update the chart to the expanded path
    update(root, root, treeLayout, width, height, i);
  }

  /**
   * Helper function to expand a single node
   */
  function expandSingle(d) {
    // if the d object has hidden children, unhide them and set _children property to null
    if (d._children) {
      d.children = d._children;
      d._children = null;
    }
  }
  
  return (
    <TreeChartWrapperDiv ref={wrapperRef}>
      <svg ref={svgRef}>
        <g id="zoomContainer">
          <g id="parentContainer"></g>
          <Tooltip />
        </g>
      </svg>
    </TreeChartWrapperDiv>
  );
}

export default TreeChartD3;