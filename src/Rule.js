import React from 'react';
import PropTypes from 'prop-types';
import './Rule.css';

function Rule({
  onFieldChanged,
  field,
  onOperatorChanged,
  operator,
  onValueChanged,
  onDelete,
}) {
  return (
    <li>
      <select className="select-student-info" onChange={onFieldChanged}>
        {field}
      </select>
      <select
        className="select-comparison-operator"
        onChange={onOperatorChanged}
      >
        {operator}
      </select>
      <input className="input-value" onChange={onValueChanged} />
      <button type="button" className="btn-delete-rule" onClick={onDelete}>
        DELETE
      </button>
    </li>
  );
}

Rule.propTypes = {
  onFieldChanged: PropTypes.func.isRequired,
  field: PropTypes.arrayOf(PropTypes.string).isRequired,
  operator: PropTypes.arrayOf(PropTypes.string).isRequired,
  onOperatorChanged: PropTypes.func.isRequired,
  onValueChanged: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Rule;
