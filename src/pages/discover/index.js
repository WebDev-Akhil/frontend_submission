import React from "react";
import styled from "styled-components";

import * as colors from "../../colors";
import Api, * as fetcher from "../../fetcher";

import SearchFilters from "../../components/searchfilter";
import MovieList from "../../components/movielist";
import "./index.scss";
import { genres } from "../../constant";
const queryString = require("query-string");

export default class Discover extends React.Component {
  constructor(props) {
    super(props);
    this.api = new Api();
    this.state = {
      keyword: "",
      year: 0,
      results: [],
      totalCount: 0,
      genreOptions: genres,
      ratingOptions: [
        { id: 7.5, name: 7.5 },
        { id: 8, name: 8 },
        { id: 8.5, name: 8.5 },
        { id: 9, name: 9 },
        { id: 9.5, name: 9.5 },
        { id: 10, name: 10 },
      ],
      languageOptions: [
        { id: "GR", name: "Greek" },
        { id: "EN", name: "English" },
        { id: "RU", name: "Russian" },
        { id: "PO", name: "Polish" },
      ],
    };
  }

  componentDidMount() {
    if (this.props.location.search) {
      const { categories } = queryString.parse(this.props.location.search);
      this.getMoviesBySearch(categories);
    } else this.getPopularMovies();
  }

  getPopularMovies = () => {
    this.api.getPopularMovies().then((response) => {
      const {
        data: { results, total_results },
      } = response;
      this.setState({
        results,
        totalCount: total_results,
      });
    });
  };

  getMoviesBySearch = (categories = "") => {
    const query = `${categories ? `&with_genres=${categories}` : ""} `;
    this.api.getPopularMovies(query).then((response) => {
      const {
        data: { results, total_results },
      } = response;
      this.setState({
        results,
        totalCount: total_results,
      });
    });
  };

  // Write a function to preload the popular movies when page loads & get the movie genres

  // Write a function to trigger the API request and load the search results based on the keyword and year given as parameters

  render() {
    const {
      genreOptions,
      languageOptions,
      ratingOptions,
      totalCount,
      results,
    } = this.state;

    return (
      <DiscoverWrapper className="flex discover-wrapper">
        {/* <MobilePageTitle>Discover</MobilePageTitle>{" "} */}
        {/* MobilePageTitle should become visible on small screens & mobile devices*/}
        <MovieFilters>
          <SearchFilters
            genres={genreOptions}
            ratings={ratingOptions}
            languages={languageOptions}
            searchMovies={(keyword, year) => this.searchMovies(keyword, year)}
          />
        </MovieFilters>
        <MovieResults className="movie_results">
          {totalCount > 0 && <TotalCounter>{totalCount} Movies</TotalCounter>}
          <MovieList
            movies={results || []}
            genres={genreOptions || []}
            totalCount={totalCount}
          />
        </MovieResults>
      </DiscoverWrapper>
    );
  }
}

const DiscoverWrapper = styled.main`
  padding: 60px 35px;
  flex-direction: row-reverse;
`;

const TotalCounter = styled.div`
  font-weight: 900;
  font-size: 18px;
  padding-bottom: 5px;
`;

const MovieResults = styled.div`
  width: 60%;
`;

const MovieFilters = styled.div`
  width: 40%;
  padding: 30px 10px 0px;
`;

const MobilePageTitle = styled.header``;
