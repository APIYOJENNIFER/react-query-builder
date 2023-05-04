import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Rule.css';

class Rule extends Component {
  render() {
    return (
      <li>
        <select
          className="select-student-info"
          onChange={this.props.onFieldChanged}
        >
          {this.props.field}
        </select>
        <select
          className="select-comparison-operator"
          onChange={this.props.onOperatorChanged}
        >
          {this.props.operator}
        </select>
        <input className="input-value" onChange={this.props.onValueChanged} />
        <button className="btn-delete-rule" onClick={this.props.onDelete}>
          DELETE
        </button>
      </li>
    );
  }
}

Rule.propTypes = {
  onFieldChanged: PropTypes.func.isRequired,
  field: PropTypes.array.isRequired,
  operator: PropTypes.array.isRequired,
  onOperatorChanged: PropTypes.func.isRequired,
  onValueChanged: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Rule;
