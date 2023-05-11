import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import Operator from './Operator';
import Value from './Value';
import DeleteRule from './DeleteRule';

class Rule extends PureComponent {
  render() {
    const {
      onValueChange, onFieldChange, onOperatorChange, onDelete,
    } = this.props;

    return (
      <li>
        <Field onFieldChange={onFieldChange} />
        <Operator onOperatorChange={onOperatorChange} />
        <Value onValueChange={onValueChange} />
        <DeleteRule onDelete={onDelete} />
      </li>
    );
  }
}

Rule.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onOperatorChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Rule;
