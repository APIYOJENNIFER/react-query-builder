import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class DeleteRule extends PureComponent {
  render() {
    const { onDelete } = this.props;

    return (
      <button type="button" className="btn-delete-rule" onClick={onDelete}>
        DELETE
      </button>
    );
  }
}

DeleteRule.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default DeleteRule;
