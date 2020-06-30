import React, { useState } from "react";

import TreeChartD3 from '../../components/TreeChartD3/TreeChartD3';

import ChartControls from '../../components/ChartControls/ChartControls';

import {
    ViewContainer
} from './org-chart-page-styles';


function OrgChartPage() {
    return (
        <ViewContainer>
            <TreeChartD3 />
            <ChartControls />
        </ViewContainer>  
    )
}

export default OrgChartPage;