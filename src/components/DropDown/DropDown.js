import React, { Component, useContext } from 'react'
import FontAwesome from 'react-fontawesome';

import {
  DropDownWrapper,
  DropDownHeader,
  DropDownHeaderTitle,
  DropDownArrow,
  DropDownUnorderedList,
  DropDownListItem,
  DropDownCheck,
} from "./dropdown-styles";

import axios from "axios";
import { hierarchy } from "d3";
import { collapse, expand } from "../../utils/treeChartD3Utilities";


import { D3Context } from "../../contexts/D3Context";

// Temporary imports for illustration purposes
import CanadaOrgChart from "../../data/GovernmentCanadaOrgChart/GovernmentOrgChart";

class Dropdown extends Component {
  // TODO: change this when switching to a functional component
  static contextType = D3Context;
  constructor(props){
    super(props)
    this.state = {
      listOpen: false,
      headerTitle: this.props.title
    }
    this.close = this.close.bind(this)
  }

  componentDidUpdate(){
    const { listOpen } = this.state
    setTimeout(() => {
      if(listOpen){
        window.addEventListener('click', this.close)
      }
      else{
        window.removeEventListener('click', this.close)
      }
    }, 0)
  }

  componentWillUnmount(){
    window.removeEventListener('click', this.close)
  }

  close(timeOut){
    this.setState({
      listOpen: false
    })
  }

  selectItem(title, id){
    axios
      .get(
        `http://127.0.0.1:5000/api/v1/department/${id}?lang=en`
      )
      .then(({ data })  => {
        let orgChart = JSON.parse(data["org_chart"]);
        // Start by expanding all nodes (TODO: make this done by default in scheduled job to remove this step)
        expand(orgChart)
        // index org chart with d3
        orgChart = hierarchy(orgChart);
        // Collapse again starting at level 1 so initial view is nice
        orgChart.children.forEach(collapse);
        // Get the d3 state and action dispatcher (TODO: change this when dropdown becomes a functional component)
      const { dispatch } = this.context;
        dispatch({
          type: "SET_TREECHART_ROOT",
          dataRoot: orgChart.children[0]
        })
      });
    let stateKey = "department";
    console.log(CanadaOrgChart[title][0])
    
    // API call would go here and fetch the required tree chart root. For illustration
    // just use the imported datasets
    // dispatch({
    //   type: "SET_TREECHART_ROOT",
    //   dataRoot: CanadaOrgChart[title][0]
    // })

    this.setState({
      headerTitle: title,
      listOpen: false
    }, this.props.resetThenSet(id, stateKey))
  }

  toggleList(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }

  render(){
    const{list} = this.props
    const{listOpen, headerTitle} = this.state
    return(
      <DropDownWrapper>
        <DropDownHeader onClick={() => this.toggleList()}>
          <DropDownHeaderTitle>{headerTitle}</DropDownHeaderTitle>
          {listOpen
            ? <DropDownArrow name="angle-up" />
            : <DropDownArrow name="angle-down" />
          }
        </DropDownHeader>
        {listOpen && <DropDownUnorderedList onClick={e => e.stopPropagation()}>
          {list.map((item)=> (
            <DropDownListItem 
              key={item.dept_id}
              onClick={
                () => this.selectItem(item.department_name, item.dept_id)
              }
            >
              {item.department_name}
              {item.selected && 
              <DropDownCheck>
                <FontAwesome name="fas fa-check-square"/>
              </DropDownCheck>
              }
            </DropDownListItem>
          ))}
        </DropDownUnorderedList>}
      </DropDownWrapper>
    )
  }
}

export default Dropdown