import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Value from './Value';
import GeneralButton from './GeneralButton';
import Error from './Error';
import { studentsInfo, comparisonOperators } from '../utils';
import GeneralSelect from './GeneralSelect';
import withOptions from './withOptions';
import withBackgroundColor from './withBackgroundColor';

class RuleItem extends PureComponent {
  render() {
    const {
      onValueChange,
      onFieldChange,
      onOperatorChange,
      onDelete,
      isValid,
      errorMessage,
      value,
      placeHolder,
      selectedValue,
      selectedOperator,
    } = this.props;

    const FieldSelect = withOptions(
      GeneralSelect,
      studentsInfo,
      onFieldChange,
      selectedValue
    );
    const OperatorSelect = withOptions(
      GeneralSelect,
      comparisonOperators,
      onOperatorChange,
      selectedOperator
    );

    const DeleteButton = withBackgroundColor(
      GeneralButton,
      '#b22222',
      onDelete,
      'DELETE'
    );

    return (
      <div className="rule-item">
        <FieldSelect />
        <OperatorSelect />
        <div className="input-error">
          <div>
            <Value
              onValueChange={onValueChange}
              value={value}
              placeHolder={placeHolder}
            />
            <DeleteButton />
          </div>
          <Error isValid={isValid} errorMessage={errorMessage} />
        </div>
      </div>
    );
  }
}

RuleItem.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onOperatorChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  selectedValue: PropTypes.string.isRequired,
  selectedOperator: PropTypes.string.isRequired,
};

export default RuleItem;
