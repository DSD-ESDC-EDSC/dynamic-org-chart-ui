import React, { useState, useEffect } from "react";
import {
    ControlsDiv,
    ControllerTitle,
} from "./chart-controls-styles";

import DropDown from "../DropDown/DropDown";
import SearchBar from "../SearchBar/SearchBar";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import SearchResults from "../SearchResults/SearchResults";

import { dropDownOptions } from "./dropDownData";

import axios from "axios";


// import SearchPage from "./SearchBar";

function ChartControls() {
    // State variable to hold dropdown menu options
    const [dropDownList, setDropDownList] = useState(dropDownOptions);
    // active button in button group
    const [activeButton, setActiveButton] = useState("Employees");

    useEffect(() => {
        axios
          .get(
            "http://127.0.0.1:5000/api/v1/departments?lang=en"
          )
          .then(({ data })  => {
            console.log(data)
            setDropDownList(data);
          });
    }, []);

    const onSearchAcronym = (e) => {
      e.preventDefault(); // prevent the form from automatically submitting + refreshing the page.
      console.log("Submitted Search ", e)
    }

    
  
    const resetThenSet = (id, key) => {
      // Get a deep copy of the dropDownList
      let temp = JSON.parse(JSON.stringify(dropDownList))
      // Reset the selected property for each item
      temp.forEach(item => item.selected = false);
      // Flag the current item as selected
      temp[id].selected = true;
      // Update the dropDownList state
      setDropDownList(temp);
    }
  
    const setActiveButtonClick = (e) => {
      console.log(activeButton)
      setActiveButton(activeButton === "Employees" ? "BusinessUnits" : "Employees");
    }

    return (
        <ControlsDiv>
            <ControllerTitle>
                Chart Controls
            </ControllerTitle>
            <SearchBar
              onSearchAcronym={onSearchAcronym}
            />
            <DropDown
              title="Select Department"
              list={dropDownList}
              resetThenSet={resetThenSet}
            />
            <ButtonGroup
              activeButton={activeButton}
              setActiveButtonClick={setActiveButtonClick}
            />
            <SearchResults />
        </ControlsDiv>
    )
}

export default ChartControls;