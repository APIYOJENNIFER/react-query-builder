import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Value extends PureComponent {
  render() {
    const { onValueChange } = this.props;

    return (
      <input
        className="input-value"
        onChange={(event) => onValueChange(event.target.value)}
      />
    );
  }
}

Value.propTypes = {
  onValueChange: PropTypes.func.isRequired,
};

export default Value;
