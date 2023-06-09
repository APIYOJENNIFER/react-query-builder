import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import Operator from './Operator';
import Value from './Value';
import GeneralButton from './GeneralButton';
import Error from './Error';

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
    } = this.props;

    return (
      <div className="rule-item">
        <Field onFieldChange={onFieldChange} />
        <Operator onOperatorChange={onOperatorChange} />
        <div className="input-error">
          <div>
            <Value
              onValueChange={onValueChange}
              value={value}
              placeHolder={placeHolder}
            />
            <GeneralButton
              className="btn-delete-rule"
              onClick={onDelete}
              buttonText="DELETE"
            />
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
};

export default RuleItem;
