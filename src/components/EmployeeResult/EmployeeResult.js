import React, { useContext } from 'react';

import { D3Context } from "../../contexts/D3Context";

import CanadaOrgChart from "../../data/GovernmentCanadaOrgChart/GovernmentOrgChart";

import {
    EmployeeResultOuterDiv,
    NameTitleDiv,
    NameText,
    TitleText,
    BusinessUnitDiv,
    BusinessUnitText,
    BusinessUnitLink,
    ContactInfoDiv,
    ContactInfoText,
} from "./employee-result-styles";

import axios from "axios";
import { hierarchy } from "d3";
import { collapse, expand } from "../../utils/treeChartD3Utilities";

const EmployeeResult = ({ employeeData }) => {
    // Get the d3 state and action dispatcher
    const { dispatch } = useContext(D3Context);
    
    /**
     * Dispatches an action to set the root node and expansion path to open the chart where the user searched.
     * @param {object} e 
     * @param {object} employeeData 
     */
    const openInOrgChart = (e, employeeData) => {
        console.log("clicked link: ", e.target)
        console.log("data are ", employeeData)
        // If the requested employee belongs in a different org chart to the current one visualized,
        // request the new org chart, then set the new state to expand to the specified path.
        axios
          .get(
            `http://127.0.0.1:5000/api/v1/department/${employeeData.dept_id}?lang=en`
          )
          .then(({ data }) => {
              console.log("data are ", data)
              console.log("inside of then ", JSON.parse(employeeData["org_chart_path"]))
            let orgChart = JSON.parse(data["org_chart"]);
            // Start by expanding all nodes (TODO: make this done by default in scheduled job to remove this step)
            expand(orgChart)
            // index org chart with d3
            orgChart = hierarchy(orgChart);
            // Collapse again starting at level 1 so initial view is nice
            orgChart.children.forEach(collapse);
            dispatch({
                type: "SET_TREECHART_ROOT",
                dataRoot: orgChart,
                nodeExpansionPath: JSON.parse(employeeData["org_chart_path"]),
            })
          });
    }

    return ( 
        <EmployeeResultOuterDiv>
            <NameTitleDiv>
                <NameText>
                    {employeeData.full_name ? employeeData.full_name : employeeData.first_name + " " + employeeData.last_name}
                </NameText>
                <TitleText>
                    {employeeData.job_title_en ? employeeData.job_title_en : employeeData.job_title}
                </TitleText>
            </NameTitleDiv>
            <BusinessUnitDiv>
                <div>
                    <BusinessUnitText>
                        {employeeData.department_en ? employeeData.department_en : employeeData.department_name}
                        <span> > </span>
                    </BusinessUnitText>
                </div>
                <BusinessUnitLink
                  onClick={(e) => {
                      openInOrgChart(e, employeeData);
                  }}
                >
                    {employeeData.org_name_en ? employeeData.org_name_en : employeeData.org_name}
                </BusinessUnitLink>
            </BusinessUnitDiv>
            <ContactInfoDiv>
                <ContactInfoText>
                    {employeeData.email}
                    <span> | </span>
                    {employeeData.phone ? employeeData.phone : employeeData.phone_number}
                </ContactInfoText>
                <ContactInfoText>
                    {employeeData.address_en ? employeeData.address_en : employeeData.address}
                </ContactInfoText>
            </ContactInfoDiv>
        </EmployeeResultOuterDiv>
     );
}
 
export default EmployeeResult;