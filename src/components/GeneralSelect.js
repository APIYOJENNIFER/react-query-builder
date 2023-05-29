import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class GeneralSelect extends PureComponent {
  render() {
    const { children, onChange, selectedValue } = this.props;

    return (
      <select
        className="select-student-info"
        value={selectedValue}
        onChange={(event) => onChange(event.target.value)}
      >
        {children}
      </select>
    );
  }
}
GeneralSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default GeneralSelect;
