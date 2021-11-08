import React from "react";
import styled from "styled-components";
import collapseIcon from "../../images/collapse.png";
import uncollapseIcon from "../../images/uncollapse.png";
import Checkbox from "../checkbox";

export default class ExpandableFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtersShown: false,
      open: true,
      activeKey: 0,
      bodyHeight: 0,
      checked: false,
      categoriesIds: [],
      categoryQuery: "",
    };
  }

  handleCheckboxChange = (event) => {
    const { categoriesIds } = this.state;

    if (event.target.checked && !categoriesIds.includes(event.target.value)) {
      categoriesIds.push(event.target.value);
    } else {
      categoriesIds.splice(categoriesIds.indexOf(event.target.value), 1);
    }
    this.setState(
      {
        checked: event.target.checked,
        categoriesIds: categoriesIds,
        categoryQuery: categoriesIds.length > 0 ? categoriesIds.join(",") : "",
      },
      () => {
        console.log("hello");
        console.log(this.props);
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
                      handleCheckboxChange={this.handleCheckboxChange}
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
