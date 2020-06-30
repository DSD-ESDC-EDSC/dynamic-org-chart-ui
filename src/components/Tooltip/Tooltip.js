import React, { useContext } from "react";

import FontAwesome from 'react-fontawesome';

import {
  ToolTipForeignObject,
  ToolTipButtonGroupDiv,
  ToolTipInnerButton,
} from "./tooltip-styles";

import axios from "axios";

import { D3Context } from "../../contexts/D3Context";

import { teamSearchResults } from "../../data/SearchResultData/teamSearchResults";

/**
 * A functional component that renders a tooltip at a given x,y position
 */
function Tooltip() {
  // Get the d3 state and action dispatcher
  const { d3State, dispatch } = useContext(D3Context);

  if (d3State.tooltipCoordinates) {
    // TODO: could display metadata from the hoveredNode
    // console.log("hovered node is ", hoveredNode);
    var { xScale, yScale, hovered} = d3State.tooltipCoordinates;
  }

  /**
   * Sets fake results to the "See the team" section
   * @param {Object} e 
   * @param {Object} hoveredNode 
   */
  const onTooltipClick = (e, hoveredNode) => {
    const orgID = hoveredNode.data.org_id;
    axios
      .get(
        `http://127.0.0.1:5000/api/v1/employees/${orgID}?lang=en`
      )
      .then(({ data })=> {
        console.log("response is ", data)
        dispatch({
          type: "SET_SEE_TEAM_RESULTS",
          seeTeamTitle: hoveredNode.data.name,
          seeTeamSearchResults: data,
        })
      })
    // dispatch({
    //   type: "SET_SEE_TEAM_RESULTS",
    //   seeTeamTitle: hoveredNode.data.name,
    //   seeTeamSearchResults: teamSearchResults,
    // })
  }

  // The <foreignObject> SVG element includes elements from a different XML namespace. In the context of a browser, it is most likely (X)HTML.
  return (
    <ToolTipForeignObject
      id="TooltipID"
      xScale={xScale}
      yScale={yScale}
    >
      <ToolTipInnerButton
        onClick={(e) => {
          onTooltipClick(e, d3State.tooltipHoveredNode);
        }}
      >
        <FontAwesome
        style={{
          paddingRight: "5px",
        }}
        name="fas fa-users" />
        See the team
      </ToolTipInnerButton>
    </ToolTipForeignObject>
    
  )
}

export default Tooltip