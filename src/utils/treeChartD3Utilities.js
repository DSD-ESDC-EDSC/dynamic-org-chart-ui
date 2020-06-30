import * as d3 from "d3";

/**
 * Collapses child nodes of a given node of a tree.
 * @param {object} d The d3 d object
 */
export const collapse = (d) => {
    if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
    }
}

/**
 * Expands child nodes of a given node of a tree
 * @param {object} d
 */
export const expand = (d) => {
    if (d._children) {
        d.children = d._children;
        d.children.forEach(expand);
        d._children = null;
    }
}

/**
 * Generates an array specifying node size using the screen width and height
 * @param {number} width
 * @param {number} height
 * 
 * @returns {Array} An array containing two dimensions: [width, height]
 */
export const generateNodeSize = (width, height) => {
    switch(true) {
        case (width <= 400):
            return [width/5, height/5];
        case (width > 400 && width <= 600):
            return [width/6, height/6];
        case (width > 600 && width <= 800):
            return [width/7, height/7];
        case (width > 800 && width <= 1000):
            return [width/8, height/8];
        case (width > 1000 && width <= 1200):
            return [width/10, height/10];
        case (width > 1200):
            return [width/12, height/12];
        default:
            return [width/12, height/12];
    }
}

/**
 * Wraps a string contained in text to a given width.
 * @param {*} text 
 * @param {*} width 
 */
export const wrap = (text, width) => {
    /** Wraps text of the nodes so that they don't clutter the screen. */
    text.each(function() {
      var text = d3.select(this),
          words = text.text().split(/[\s,-]+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.2, // ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
  });
}

/**
 * Specifies the minimum separation between ancestor nodes. Default is that if nodes share the same parent, their
 * spacing will be half the spacing allocated to siblings that are distant cousins.
 * @param {*} a 
 * @param {*} b 
 */
export const nodeSeparation = (a, b) => {
    return a.parent == b.parent ? 1:2;
}

/**
 * Applies a vertical offset to the node text.
 * @param {object} d The d3 d object 
 */
export const staggerText = (d) => {
    switch (d.depth === 0) {
        case true:
            return -100;
        case false:
            return 35;
    }
}

/**
 * Makes the size of the text proportional to the depth of the node being displayed (the reason being
 * that deeper nodes are more cluttered and smaller text makes them more readable).
 * @param {object} d 
 */
export const dynamicTextSize = (d) => {
    const fontSize = 16 - d.depth;
    return fontSize.toString() + "px";
}


/**
 * Presents tooltip when a user hovers over a node
 */
// TODO: make this animation move in from side using x,y coords.
export const presentToolTip = () => {
  // console.log(d3.select("#TooltipID"))
  d3.select("#TooltipID")
    .style("opacity", 0)
    .transition()
    .duration(500)
    .style("opacity", 1)
    .style("display", "flex")
}

/**
 * Hides the tooltip when a user mouses away from a node, using a delay.
 */
// TODO: tooltip needs to stay open when the tooltip itself is moused over
export const hideToolTip = () => {
  d3.select("#TooltipID")
    .transition()
    .delay(1000)
    .duration(20)
    .style("opacity", 0)
    .style("display", "hidden")
}

/**
 * Instantly hides a node when a user mouses away.
 */
export const hideToolTipInstant = () => {
  d3.select("#TooltipID")
    .transition()
    .delay(0)
    .duration(0)
    .style("display", "hidden")
    .style("opacity", 0)
}

/**
 * Applies pre-processing (if any) to the raw label before it is
 * assigned to the text svg for a node.
 * @param {*} label 
 */
export const preProcessNodeLabel = (label) => {
  // case: label is an array of names
  if (typeof(label) === "object") {
    return label.join(" ");
  } else {
    return label;
  }
}

/**
 * Applies node colouring on hover
 */
export const colourNode = (d, i, nodes) => {
    d3.select(nodes[i]).selectAll("circle")
    .transition()
    .duration(300)
    .style("fill", "rgba(219, 0, 106, 0.75)");
}

export const removeNodeColour = (d, i, nodes) => {
    // Remove highlighting effect so it is clear that the node is no longer selected
    d3.select(nodes[i]).selectAll("circle")
    .transition()
    .duration(300)
    // Apply the old fill and stroke styles
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
}