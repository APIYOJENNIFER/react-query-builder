import React, { PureComponent } from 'react';

const withOptions = (WrappedComponent, options, onChange, selectedValue) =>
  class WithOptions extends PureComponent {
    optionsList = options.map((item) => <option key={item}>{item}</option>);

    render() {
      return (
        <WrappedComponent onChange={onChange} selectedValue={selectedValue}>
          {this.optionsList}
        </WrappedComponent>
      );
    }
  };

export default withOptions;
