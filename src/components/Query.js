import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import AddRule from './AddRule';
import Logical from './Logical';
import { deleteRule, onEventChange, updateRulesList } from '../helper';
import Rules from './Rules';

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

    this.setState({ queryObject: eventResult.queryObject });
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
      queryObject: deleteResult.newQueryObject,
      rulesList: deleteResult.updatedRulesList,
    });
  };

  render() {
    const { rulesList } = this.state;

    return (
      <div className="App">
        <div className="App-heading">
          <h2>React Query Builder</h2>
        </div>
        <div className="App-top-section">
          <Logical
            onLogicalChange={(event) => this.handleLogicalChange(event)}
          />
          <AddRule onAddRule={this.addRule} />
        </div>
        <Rules
          rulesList={rulesList}
          onFieldChange={this.handleFieldChange}
          onOperatorChange={this.handleOperatorChange}
          onValueChange={this.handleValueChange}
          onDelete={this.handleDelete}
        />
      </div>
    );
  }
}

export default Query;
