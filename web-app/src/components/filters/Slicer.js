import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Checkbox from '../Checkbox';
import './Slicer.css';

class Slicer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isSelectAll: false,
      searchValue: ''
    };
  }

  static propTypes = {
    checkBoxes: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  };

  toggleSelectAll = () => {
    const newIsSelectAll = !this.state.isSelectAll;
    const newCheckBoxes = [...this.props.checkBoxes];
    for (let i = 0; i < newCheckBoxes.length; i++) {
      newCheckBoxes[i].isChecked = newIsSelectAll;
    }

    this.setState(prevState => ({
      isSelectAll: !prevState.isSelectAll
    }));

    this.props.onChange(this.props.id, newCheckBoxes);
  }

  handleSearchValueChange = (event) => {
    const searchValue = event.target.value;
    this.setState({
      searchValue: searchValue
    });
  }

  handleCheckBoxChange = (name, isChecked) => {
    const newCheckBoxes = [...this.props.checkBoxes];
    const index = newCheckBoxes.findIndex(x => x.value === name);
    newCheckBoxes[index].isChecked = isChecked;
    this.props.onChange(this.props.id, newCheckBoxes);
  }

  render() {
    const { 
      checkBoxes = [],
    } = this.props;

    const {
      searchValue,
      isSelectAll
    } = this.state;

    const checkBoxItems = [];
    for (let i = 0; i < checkBoxes.length; i++) {
      const checkBox = checkBoxes[i];
      const value = checkBox.value;
      if (!searchValue || (searchValue && value.includes(searchValue))) {
        checkBoxItems.push(
          (
            <Checkbox 
              key={i} 
              name={checkBox.value} 
              value={checkBox.value} 
              checked={checkBox.isChecked} 
              onChange={this.handleCheckBoxChange} 
            />
          )
        )
      }
    }
    return (
      <div>
        {/*
        <input 
          type="text" 
          name="name" 
          value={this.state.searchValue}
          onChange={this.handleSearchValueChange}
          placeholder="Search..."
          className="filter-input"
        />
        <button className="slicer-toggle-button" onClick={this.toggleSelectAll}>
          {
            isSelectAll ? (
              <FontAwesomeIcon icon="square" />
            ): (
              <FontAwesomeIcon icon="check-square" />
            )
          }
        </button>
        */}
        <div className="slicer-body">
          {checkBoxItems}
        </div>
      </div>
    );
  }
}

export default Slicer;
