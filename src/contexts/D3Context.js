import React, { createContext, useReducer } from 'react';

import { d3Reducer } from "../reducers/d3Reducer";

import CanadaOrgChart from "../data/GovernmentCanadaOrgChart/GovernmentOrgChart";

// TODO: break this into multiple contexts/reducers if required
// TODO: consider initialization function that sets the initial state.
const initialState = {
    // Identity to keep track of data elements in the d3 visualization
    dataIdentity: 0,
    // Hard-coding ESDC as the default starting department
    dataRoot: CanadaOrgChart["Employment and Social Development Canada"][0],
    // TODO: could replace employeeSearchResults with more generic results (e.g. people in business unit)
    searchResultsTitle: "",
    // Employee search results
    employeeSearchResults: [],
    // Business unit search results
    businessSearchResults: [],
    // See Team search results
    seeTeamSearchResults: [],
    // Node expansion path (this will highlight the path to the node that was searched for).
    nodeExpansionPath: null,
    // Tooltip coordinates
    tooltipCoordinates: null,
    // Tooltip node
    tooltipHoveredNode: null,
}

export const D3Context = createContext(initialState);

const D3ContextProvider = (props) => {
    const [d3State, dispatch] = useReducer(d3Reducer, initialState);

    return (
        <D3Context.Provider value={{d3State, dispatch}}>
            {props.children}
        </D3Context.Provider>
    )
}

export default D3ContextProvider;