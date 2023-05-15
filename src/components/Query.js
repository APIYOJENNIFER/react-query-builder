import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Logical from './Logical';
import { deleteRule, onEventChange, updateRulesList } from '../helper';
import Rules from './Rules';
import GeneralButton from './GeneralButton';
import QueryOutput from './QueryOutput';

class Query extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rulesList: [],
      queryObject: {
        id: nanoid(),
        combinator: 'AND',
        rules: [],
      },
    };
  }

  addRule = () => {
    const { queryObject, rulesList } = this.state;
    const updatedRulesList = updateRulesList(queryObject, rulesList);

    this.setState({
      rulesList: updatedRulesList.rulesList,
      queryObject: {
        ...queryObject,
        rules: updatedRulesList.updatedRules,
      },
    });
  };

  handleLogicalChange = (event) => {
    const { queryObject } = this.state;

    this.setState({
      queryObject: {
        ...queryObject,
        combinator: event,
      },
    });
  };

  handleEventChange = (key, event, idx) => {
    const { queryObject } = this.state;
    const eventResult = onEventChange(queryObject, key, event, idx);

    this.setState({
      queryObject: {
        ...queryObject,
        rules: eventResult.updatedRules,
      },
    });
  };

  handleFieldChange = (event, idx) => {
    this.handleEventChange('field', event, idx);
  };

  handleOperatorChange = (event, idx) => {
    this.handleEventChange('operator', event, idx);
  };

  handleValueChange = (event, idx) => {
    this.handleEventChange('value', event, idx);
  };

  handleDelete = (id) => {
    const { queryObject, rulesList } = this.state;
    const deleteResult = deleteRule(queryObject, rulesList, id);

    this.setState({
      queryObject: {
        ...queryObject,
        rules: deleteResult.filteredRules,
      },
      rulesList: deleteResult.updatedRulesList,
    });
  };

  render() {
    const { rulesList, queryObject } = this.state;

    return (
      <div className="App">
        <div className="App-heading">
          <h2>React Query Builder</h2>
        </div>
        <hr />
        <div className="App-top-section">
          <Logical
            onLogicalChange={(event) => this.handleLogicalChange(event)}
          />
          <GeneralButton
            className="btn-add-rule"
            onClick={this.addRule}
            buttonText="ADD RULE"
          />
        </div>
        <Rules
          rulesList={rulesList}
          onFieldChange={this.handleFieldChange}
          onOperatorChange={this.handleOperatorChange}
          onValueChange={this.handleValueChange}
          onDelete={this.handleDelete}
        />
        <QueryOutput queryObject={queryObject} />
      </div>
    );
  }
}

export default Query;
