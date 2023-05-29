import React, { PureComponent } from 'react';

const withBackgroundColor = (WrappedComponent, bgColor, onClick, buttonText) =>
  class WithBackgroundColor extends PureComponent {
    style = {
      backgroundColor: bgColor,
      padding: '9px',
      borderRadius: '2px',
      cursor: 'pointer',
      border: 'none',
      color: 'white',
      fontSize: '14px',
      marginLeft: '10px',
      fontFamily: 'Times New Roman, Times, serif',
    };

    render() {
      return (
        <WrappedComponent
          style={this.style}
          onClick={onClick}
          buttonText={buttonText}
        />
      );
    }
  };
export default withBackgroundColor;
