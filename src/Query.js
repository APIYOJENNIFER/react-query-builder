import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import AddRule from './AddRule';
import Logical from './Logical';
import Rule from './Rule';
import { deleteRule, onEventChange, updateRulesList } from './helper';

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
    const rule = rulesList.map((item) => (
      <Rule
        key={item.id}
        onFieldChange={(event) => this.handleFieldChange(event, item.id)}
        onOperatorChange={(event) => this.handleOperatorChange(event, item.id)}
        onValueChange={(event) => this.handleValueChange(event, item.id)}
        onDelete={() => this.handleDelete(item.id)}
      />
    ));

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
        <ol className="rules-list">{rule}</ol>
      </div>
    );
  }
}

export default Query;
