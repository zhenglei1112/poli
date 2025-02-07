import React from 'react';
import PropTypes from 'prop-types';
import './SelectButtons.css';

class SelectButtons extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    selections: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  };

  clickButton = (value) => {
    const { name } = this.props;
    this.props.onChange(name, value);
  }
  
  render() {
    const {
      value,
      selections = []
    } =  this.props;
    const buttonItems = [];
    for (let i = 0; i < selections.length; i++) {
      const current = selections[i];
      const activeClass = current === value ? 'select-button-active' : '';
      buttonItems.push(
        <div className={`select-button ${activeClass}`} onClick={() => this.clickButton(current)} key={current}>{current}</div>
      )
    }

    return (
      <div className="selectbuttons-container">
        {buttonItems}
      </div>
    )
  };
}

export default SelectButtons;