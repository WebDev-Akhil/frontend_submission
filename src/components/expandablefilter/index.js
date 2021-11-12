import React from "react";
import styled from "styled-components";
import collapseIcon from "../../images/collapse.png";
import uncollapseIcon from "../../images/uncollapse.png";
import Checkbox from "../checkbox";
import { withRouter } from "react-router-dom";

class ExpandableFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtersShown: false,
      open: true,
      activeKey: 0,
      bodyHeight: 0,
      checked: false,
      generesIds: [],
      generesIds: [],
      minVotesIds: [],
      langsIds: [],
      categoryQuery: "",
    };
  }

  handleCheckboxChange = (event, key) => {
    const { generesIds, minVotesIds, langsIds } = this.state;
    console.log(generesIds.length, "genereids");
    console.log(langsIds.length, "langsIds");

    if (
      key === 0 &&
      event.target.checked &&
      !generesIds.includes(event.target.value)
    ) {
      generesIds.push(event.target.value);
    } else {
      key === 0 && generesIds.splice(generesIds.indexOf(event.target.value), 1);
    }

    if (
      key === 1 &&
      event.target.checked &&
      !minVotesIds.includes(event.target.value)
    ) {
      minVotesIds.push(event.target.value);
    } else {
      key === 1 &&
        minVotesIds.splice(minVotesIds.indexOf(event.target.value), 1);
    }

    // console.log(event.target.value, "value");
    if (
      key === 2 &&
      event.target.checked &&
      !langsIds.includes(event.target.value)
    ) {
      langsIds.push(event.target.value);
    } else {
      key === 2 && langsIds.splice(langsIds.indexOf(event.target.value), 1);
    }

    const query = `${
      generesIds.length > 0 ? "categories=" + generesIds.join(",") + "&" : ""
    }${langsIds.length > 0 ? "language=" + langsIds.join(",") + "&" : ""}${
      minVotesIds.length > 0 ? "vote_average_lte=" + minVotesIds.join(",") : ""
    }`;
    this.setState(
      {
        checked: event.target.checked,
        generesIds,
        langsIds,
        minVotesIds,
        categoryQuery: query,
      },
      () => {
        this.props.history.push(`/discover?${this.state.categoryQuery}`);
      }
    );
  };

  render() {
    const { categories } = this.props;
    return (
      <AccordionWrapper>
        {categories &&
          categories.map((category, index) => (
            <AccordionWrapperCont>
              <AccordianHeader
                className="flex"
                onClick={() =>
                  this.setState({
                    activeKey: category._id,
                  })
                }
              >
                <Image
                  src={
                    this.state.activeKey === index
                      ? collapseIcon
                      : uncollapseIcon
                  }
                  alt="collapse-non"
                />
                <AccordianTitle>{category.title}</AccordianTitle>
              </AccordianHeader>
              <InternalWrapper
                open={this.state.activeKey === index}
                key={`accord-body-${category._id}`}
              >
                {category.list.map((item) => (
                  <Label className="flex">
                    <Checkbox
                      name={item.name}
                      id={item.id}
                      checked={this.state.checked}
                      handleCheckboxChange={(event) =>
                        this.handleCheckboxChange(event, category._id)
                      }
                    />
                    <span style={{ marginLeft: 8 }}>{item.name}</span>
                  </Label>
                ))}
              </InternalWrapper>{" "}
            </AccordionWrapperCont>
          ))}
      </AccordionWrapper>
    );
    // You need to create your own checkbox component with a custom checkmark
  }
}

const AccordionWrapper = styled.div``;

const AccordionWrapperCont = styled.div`
  transition: all 0.6s ease-in-out;
`;

const AccordianHeader = styled.div`
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 10px 10px 10px 0px;
`;

const AccordianTitle = styled.h4`
  margin: 0;
`;

const Image = styled.img`
  width: 24px;
  height: 20px;
`;

const InternalWrapper = styled.div`
  width: 100%;
  display: ${(props) => (props.open ? "block" : "none")};
  transition: all 0.3s ease-in-out;
  overflow: hidden;
`;

const Label = styled.label`
  font-size: 18px;
  margin-bottom: 5px;
`;

export default withRouter(ExpandableFilter);
