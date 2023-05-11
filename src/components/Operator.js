import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { comparisonOperators } from '../utils';

class Operator extends PureComponent {
  operatorList = comparisonOperators.map((item) => (
    <option key={item}>{item}</option>
  ));

  render() {
    const { onOperatorChange } = this.props;

    return (
      <select
        className="select-comparison-operator"
        onChange={(event) => onOperatorChange(event.target.value)}
      >
        {this.operatorList}
      </select>
    );
  }
}

Operator.propTypes = {
  onOperatorChange: PropTypes.func.isRequired,
};

export default Operator;
