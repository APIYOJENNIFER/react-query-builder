import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class GeneralButton extends PureComponent {
  render() {
    const { className, onClick, buttonText } = this.props;

    return (
      <button className={className} type="button" onClick={onClick}>
        {buttonText}
      </button>
    );
  }
}

GeneralButton.propTypes = {
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};
export default GeneralButton;
