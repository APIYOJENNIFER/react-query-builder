import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { studentsInfo } from '../utils';

class Field extends PureComponent {
  fieldList = studentsInfo.map((item) => <option key={item}>{item}</option>);

  render() {
    const { onFieldChange } = this.props;

    return (
      <select
        className="select-student-info"
        onChange={(event) => onFieldChange(event.target.value)}
      >
        {this.fieldList}
      </select>
    );
  }
}

Field.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
};

export default Field;
