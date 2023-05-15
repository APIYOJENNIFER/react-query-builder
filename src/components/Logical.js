import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { logicalOperators } from '../utils';

class Logical extends PureComponent {
  logicalList = logicalOperators.map((item) => (
    <option key={item}>{item}</option>
  ));

  render() {
    const { onLogicalChange } = this.props;

    return (
      <select
        className="logical-select"
        onChange={(event) => onLogicalChange(event.target.value)}
      >
        {this.logicalList}
      </select>
    );
  }
}

Logical.propTypes = {
  onLogicalChange: PropTypes.func.isRequired,
};

export default Logical;
