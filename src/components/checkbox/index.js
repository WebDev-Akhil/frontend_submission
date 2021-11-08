import React from "react";
import styled from "styled-components";

export default class CheckBox extends React.Component {
  // Create a custom checkbox component
  constructor(props) {
    super(props);
    this.state = {
      isChecked: props.checked,
      name: props.name,
      _id: props.id,
    };
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
  }

  toggleCheckboxChange(event) {
    const { handleCheckboxChange } = this.props;
    this.setState({ isChecked: !this.state.isChecked });
    handleCheckboxChange(event);
  }

  state = { checked: false };
  toggleCheckboxChange(event) {
    const { handleCheckboxChange } = this.props;
    this.setState({ isChecked: !this.state.isChecked });
    handleCheckboxChange(event);
  }
  render() {
    const { isChecked, name, _id } = this.state;
    return (
      <CheckboxCont>
        <input
          name={name}
          value={_id}
          type="checkbox"
          checked={isChecked}
          onChange={this.toggleCheckboxChange}
        />
      </CheckboxCont>
    );
  }
}

const CheckboxCont = styled.div`
  position: relative;
`;
