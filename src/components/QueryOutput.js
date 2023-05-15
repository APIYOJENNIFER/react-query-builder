import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class QueryOutput extends PureComponent {
  render() {
    const { queryObject } = this.props;

    return (
      <pre className="query-output">{JSON.stringify(queryObject, null, 2)}</pre>
    );
  }
}

QueryOutput.propTypes = {
  queryObject: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default QueryOutput;
