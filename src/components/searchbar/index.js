import React from "react";
import styled from "styled-components";
import * as colors from "../../colors";
import SearchIcon from "../../images/search-icon-yellow.png";
import CalendarIcon from "../../images/year-icon.png";
import filterIcon from "../../images/filter-icon.png";
import { withRouter } from "react-router-dom";
import "./index.scss";
const queryString = require("query-string");

class SearchBar extends React.Component {
  state = {
    searchText: "",
    date: "",
    show: false,
  };

  componentDidMount() {
    this.searchByText();
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.searchByText();
      }
    );
  };

  searchByText = () => {
    const { searchText, date } = this.state;
    const { categories, language, vote_average_lte } = queryString.parse(
      this.props.location.search
    );

    const query = `${categories ? "categories=" + categories + "&" : ""}${
      language ? "language=" + language + "&" : ""
    }${vote_average_lte ? "vote_average_lte=" + vote_average_lte + "&" : ""}${
      searchText ? `search=` + searchText + "&" : ""
    }${
      date ? "primary_release_year=" + new Date(date).getFullYear() + "&" : ""
    }`;

    this.props.history.push(`/discover?${query}`);
  };

  checkSearch = () => {
    const { search } = this.props.location?.search;
    const lastChar = search.substr(
      this.props.location?.search.length - 1,
      this.props.location?.search.length
    );

    if (lastChar == "?") {
      return;
    }
    if (lastChar == "&") {
      return;
    }

    return "?";
  };

  render() {
    const { searchText, date, show } = this.state;
    const { isHide } = this.props;
    return (
      <SearchBarMain>
        <StyledInput className={"inputWithIcon"} marginBottom={"25"}>
          <Input
            type="text"
            name="searchText"
            value={searchText}
            onChange={this.handleChange}
            placeholder="Search"
          />
          <Image src={SearchIcon} alt="collapse-non" />
          <Image
            src={filterIcon}
            alt="filter-non"
            className="filter_mobile"
            onClick={() =>
              this.setState(
                {
                  show: !this.state.show,
                },
                () => {
                  isHide(this.state.show);
                }
              )
            }
          />
        </StyledInput>
        <StyledInput className={`input-date-main ${show && "show"}`}>
          <Input
            type="date"
            name="date"
            value={date}
            onChange={this.handleChange}
            placeholder="Year of release"
            className="flex date-input show-date"
          />
          <Image src={CalendarIcon} alt="collapse-non" />
        </StyledInput>
      </SearchBarMain>
    );
  }
}

const SearchBarMain = styled.div``;

const Input = styled.input`
  height: 40px;
  font-size: 18px;
  width: 100%;
  outline: none;
  padding: 8px;
  box-sizing: border-box;
  transition: 0.3s;
  padding-left: 50px;
  border: none;
  border-bottom: 2px solid #d9e021;
  color: #d9e021;
  ::placeholder {
    color: #d9e021;
    opacity: 1;
  }
`;

const StyledInput = styled.div`
  margin-bottom: ${(props) => props?.marginBottom + `px`};
  position: relative;
  & > img {
    position: absolute;
    left: 0;
    top: 4px;
    padding: 5px 8px;
    fill: black;
    transition: 0.3s;
  }

  &.inputWithIcon {
    position: relative;
  }
`;

const Image = styled.img`
  width: 35px;
`;

export default withRouter(SearchBar);
