import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import FontAwesome from 'react-fontawesome';

import { D3Context } from "../../contexts/D3Context";

import { employeeSearchResults } from "../../data/SearchResultData/employeeSearchResults";

import axios from "axios";

import {
    SearchBarDiv,
    FormStyle,
    SearchBarStyle,
    SubmitButtonStyle
} from "./search-bar-styles";


const SearchBar = () => {
  // Get the d3 state and action dispatcher
  const { dispatch } = useContext(D3Context);
  const [searchText, setSearchText] = useState("");

  /**
   * Sets fake results to the employeeSearchResults state variable.
   * @param {object} e The event object
   */
  const onSearchSubmit = (e) => {
    e.preventDefault();
    const testQuery = {
      "query": {
        "multi_match": {
          "query": searchText,
          "fields": ["full_name^5", "first_name", "last_name"],
          "fuzziness": "AUTO"
        }
      }
    }
    // TODO: clear old search results on submit
    axios
      .get(
        "http://localhost:9200/employee/_search",
        {
          params: {
            source: JSON.stringify(testQuery),
            source_content_type: 'application/json'
          }
        }
      )
      .then(({ data }) => {
        dispatch({
          type: "SET_EMPLOYEE_SEARCH_RESULTS",
          employeeSearchResults: data.hits.hits,
        })
      });
    // dispatch({
    //   type: "SET_EMPLOYEE_SEARCH_RESULTS",
    //   employeeSearchResults,
    // })
  }

  const onSearchChange = (e) => {
    // TODO: incrementally update the search result state variable as the user types
    // console.log("Search Changed ", e.target.value)
    e.preventDefault();
    setSearchText(e.target.value);
  }

  return (
    <SearchBarDiv>
      <FormStyle
        onSubmit={onSearchSubmit}
        autoComplete="off"
      >
        <SearchBarStyle
          type="text"
          name="acronym"
          aria-label="search bar"
          onChange={onSearchChange}
          placeholder="Search"
        />
        <SubmitButtonStyle
          type="submit"
          aria-label="submit search"
          value=""
        >
          <FontAwesome name="fas fa-search"/>
        </SubmitButtonStyle>
      </FormStyle>
    </SearchBarDiv>
      
  )
}

export default SearchBar;