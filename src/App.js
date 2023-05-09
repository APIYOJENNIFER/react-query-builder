import './App.css';
import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { logicalOperators, studentsInfo, comparisonOperators } from './utils';
import Rule from './Rule';
import { logicalOperators, studentsInfo, comparisonOperators } from './utils';
import Rule from './Rule';

class App extends Component {
  logicalList = logicalOperators.map((item) => (
    <option key={item}>{item}</option>
  ));

  fieldList = studentsInfo.map((item) => <option key={item}>{item}</option>);

  comparisonList = comparisonOperators.map((item) => (
    <option key={item}>{item}</option>
  ));

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

  handleLogicalChange = (event) => {
    const { queryObject } = this.state;

    this.setState({
      queryObject: {
        ...queryObject,
        combinator: event.target.value,
      },
    });
  };

  handleEventChange = (key, event, idx) => {
    const { queryObject: newQueryObject } = this.state;
    newQueryObject.rules.forEach((rule) => {
      if (rule.id === idx) {
        const currentRule = rule;
        currentRule[key] = event.target.value.trim();
      }
    });
    this.setState({ queryObject: newQueryObject });
  };

  handleFieldChange = (event, idx) => {
    this.handleEventChange('field', event, idx);
  };

  handleComparisonChange = (event, idx) => {
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

  render() {
    const { rulesList } = this.state;
    const rule = rulesList.map((item) => (
      <Rule
        id={item.id}
        key={item.id}
        field={this.fieldList}
        onFieldChanged={(event) => this.handleFieldChange(event, item.id)}
        operator={this.comparisonList}
        onOperatorChanged={(event) =>
          this.handleComparisonChange(event, item.id)
        }
        onValueChanged={(event) => this.handleValueChange(event, item.id)}
        onDelete={() => this.handleDelete(item.id)}
      />
    ));

    return (
      <div className="App">
        <div className="App-heading">
          <h2>React Query Builder</h2>
        </div>
        <hr />
        <div className="App-top-section">
          <select
            className="logical-select"
            onChange={this.handleLogicalChange}
          >
            {this.logicalList}
          </select>
          <button type="button" className="btn-add-rule" onClick={this.addRule}>
            ADD RULE
          </button>
        </div>
        <ol className="rules-list">{rule}</ol>
      </div>
    );
  }
}

export default App;
