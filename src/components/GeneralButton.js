import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class GeneralButton extends PureComponent {
  render() {
    const { onClick, buttonText, style } = this.props;

    return (
      <button style={style} type="button" onClick={onClick}>
        {buttonText}
      </button>
    );
  }
}

GeneralButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
export default GeneralButton;
