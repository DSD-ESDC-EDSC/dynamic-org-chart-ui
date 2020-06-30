/**
 * This script sets up org chart data
 */

import { hierarchy } from "d3";
import { collapse, expand } from "../../utils/treeChartD3Utilities";

import rawOrgChart from "./GovernmentCanadaOrgChart";

// Start by expanding every tree so that d3 can index them
for (var key in rawOrgChart) {
    rawOrgChart[key][0].children.forEach(expand);
}

for (var key in rawOrgChart) {
    // Note: we are also clipping the root of the tree because department is listed twice.
    rawOrgChart[key][0] = hierarchy(rawOrgChart[key][0].children[0]);
}

for (var key in rawOrgChart) {
    rawOrgChart[key][0].children.forEach(collapse);
}

export default rawOrgChart;