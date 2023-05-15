import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import Operator from './Operator';
import Value from './Value';
import GeneralButton from './GeneralButton';

class RuleItem extends PureComponent {
  render() {
    const {
      onValueChange, onFieldChange, onOperatorChange, onDelete,
    } = this.props;

    return (
      <div>
        <Field onFieldChange={onFieldChange} />
        <Operator onOperatorChange={onOperatorChange} />
        <Value onValueChange={onValueChange} />
        <GeneralButton
          className="btn-delete-rule"
          onClick={onDelete}
          buttonText="DELETE"
        />
      </div>
    );
  }
}

RuleItem.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onOperatorChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default RuleItem;
