import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import AddRule from './AddRule';
import Logical from './Logical';
import Rule from './Rule';

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
    const ruleObject = {
      id: nanoid(),
      field: 'First Name',
      operator: '=',
      value: '',
    };

    const { queryObject: newQueryObject } = this.state;
    newQueryObject.rules.push(ruleObject);

    const { id: idx } = newQueryObject.rules[newQueryObject.rules.length - 1];

    const { rulesList: updatedRulesList } = this.state;
    updatedRulesList.push({ id: idx });

    this.setState({
      rulesList: updatedRulesList,
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
    const { queryObject: newQueryObject } = this.state;
    newQueryObject.rules.forEach((rule) => {
      if (rule.id === idx) {
        const currentRule = rule;
        currentRule[key] = event.trim();
      }
    });
    this.setState({ queryObject: newQueryObject });
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
    const { rulesList } = this.state;
    const updatedRulesList = rulesList.filter((item) => item.id !== id);

    const { queryObject: newQueryObject } = this.state;
    const filteredRules = newQueryObject.rules.filter((rule) => rule.id !== id);

    newQueryObject.rules = filteredRules;

    this.setState({
      queryObject: newQueryObject,
      rulesList: updatedRulesList,
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
