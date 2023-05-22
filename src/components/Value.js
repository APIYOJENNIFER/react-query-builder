import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Value extends PureComponent {
  render() {
    const { onValueChange, value, placeHolder } = this.props;

    return (
      <input
        value={value}
        placeholder={placeHolder}
        className="input-value"
        onChange={(event) => onValueChange(event.target.value)}
      />
    );
  }
}

Value.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
};

export default Value;
