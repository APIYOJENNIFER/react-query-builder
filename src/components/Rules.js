import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RuleItem from './RuleItem';

class Rules extends Component {
  render() {
    const {
      rulesList,
      onFieldChange,
      onOperatorChange,
      onValueChange,
      onDelete,
    } = this.props;

    return rulesList.map((item) => (
      <RuleItem
        key={item.id}
        onFieldChange={(event) => onFieldChange(event, item.id)}
        onOperatorChange={(event) => onOperatorChange(event, item.id)}
        onValueChange={(event) => onValueChange(event, item.id)}
        onDelete={() => onDelete(item.id)}
        isValid={item.isValid}
        errorMessage={item.errorMessage}
        value={item.value}
      />
    ));
  }
}

Rules.propTypes = {
  rulesList: PropTypes.oneOfType([PropTypes.array]).isRequired,
  onValueChange: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  onOperatorChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Rules;
