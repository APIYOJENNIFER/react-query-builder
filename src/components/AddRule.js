import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class AddRule extends PureComponent {
  render() {
    const { onAddRule } = this.props;

    return (
      <button type="button" className="btn-add-rule" onClick={onAddRule}>
        ADD RULE
      </button>
    );
  }
}

AddRule.propTypes = {
  onAddRule: PropTypes.func.isRequired,
};

export default AddRule;
