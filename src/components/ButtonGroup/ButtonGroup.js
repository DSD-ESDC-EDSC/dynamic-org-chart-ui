import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FontAwesome from 'react-fontawesome';

import {
    ButtonGroupDiv,
    InnerButton,
} from "./button-group-styles";


class ButtonGroup extends Component {
    onClick() {

    }
    render() {
        return (
          <ButtonGroupDiv>
            <InnerButton
              activeButton = {this.props.activeButton === "Employees" ? true : false}
              onClick={this.props.setActiveButtonClick}
            >
                Employees
            <FontAwesome name="far fa-user"/>
            </InnerButton>
            <InnerButton
              activeButton = {this.props.activeButton === "Employees" ? false : true}
              onClick={this.props.setActiveButtonClick}
            >
                Business Units
            <FontAwesome name="far fa-briefcase"/>
            </InnerButton>
            {/* <InnerButton
              activeButton = {this.props.activeButton === "Employees" ? true : false}
              onClick={this.props.setActiveButtonClick}
            >
                Teams
            <FontAwesome name="fas fa-user-friends"/>
            </InnerButton> */}
          </ButtonGroupDiv>
            
        )
    }    
}

export default ButtonGroup;