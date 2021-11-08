import React from "react";
import styled, { css } from "styled-components";

import * as colors from "../../colors";
import ExpandableFilter from "../../components/expandablefilter";
import SearchBar from "../../components/searchbar";

export default class SearchFilters extends React.Component {
  render() {
    const { genres, ratings, languages, searchMovies } = this.props;
    const categories = [
      {
        _id: 0,
        title: "Select genere(s)",
        list: genres,
      },
      {
        _id: 1,
        title: "Select min.vote",
        list: ratings,
      },
      {
        _id: 2,
        title: "Select language",
        list: languages,
      },
    ];

    return (
      <FiltersWrapper>
        <SearchFiltersCont className="search_inputs_cont" marginBottom>
          <CategoryTitle>Search ...</CategoryTitle>

          {/* Implement a "SearchBar" component and re-use it for the keyword and the year inputs */}
        </SearchFiltersCont>
        <SearchFiltersCont>
          <CategoryTitle>Movies</CategoryTitle>
          <ExpandableFilter categories={categories} />
          {/* Implement a component called "ExpandableFilter" and apply it to all filter categories */}
        </SearchFiltersCont>
      </FiltersWrapper>
    );
  }
}

const FiltersWrapper = styled.div`
  position: relative;
`;

const SearchFiltersCont = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 3px;
  transition: all 0.3s ease-in-out;

  ${(props) =>
    props.marginBottom &&
    css`
      margin-bottom: 15px;
    `}
`;

const CategoryTitle = styled.div``;
