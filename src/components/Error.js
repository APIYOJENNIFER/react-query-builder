import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Error extends PureComponent {
  render() {
    const { isValid, errorMessage } = this.props;

    return !isValid && <small className="error-output">{errorMessage}</small>;
  }
}
Error.propTypes = {
  isValid: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
};
export default Error;
