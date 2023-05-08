import './App.css';
import { logicalOperators } from './utils';
import { studentsInfo } from './utils';
import { comparisonOperators } from './utils';
import React, { Component } from 'react';
import Rule from './Rule';
import { nanoid } from 'nanoid';

class App extends Component {
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

  logicalList = logicalOperators.map((item, id) => (
    <option key={id}>{item}</option>
  ));

  handleLogicalChange = (event) => {
    this.setState({
      queryObject: {
        ...this.state.queryObject,
        combinator: event.target.value,
      },
    });
  };

  fieldList = studentsInfo.map((item, id) => <option key={id}>{item}</option>);

  handleEventChange = (key, event, idx) => {
    const newQueryObject = this.state.queryObject;
    newQueryObject.rules.forEach((rule) => {
      if (rule.id === idx) {
        rule[key] = event.target.value.trim();
      }
    });
    this.setState({ queryObject: newQueryObject });
  };

  handleFieldChange = (event, idx) => {
    this.handleEventChange('field', event, idx);
  };

  comparisonList = comparisonOperators.map((item, id) => (
    <option key={id}>{item}</option>
  ));

  handleComparisonChange = (event, idx) => {
    this.handleEventChange('operator', event, idx);
  };

  handleValueChange = (event, idx) => {
    this.handleEventChange('value', event, idx);
  };

  handleDelete = (id) => {
    const rulesList = this.state.rulesList.filter((item) => {
      return item.id !== id;
    });

    const newQueryObject = this.state.queryObject;
    const filteredRules = newQueryObject.rules.filter((rule) => rule.id !== id);

    newQueryObject.rules = filteredRules;

    this.setState({
      queryObject: newQueryObject,
      rulesList: rulesList,
    });
  };

  addRule = () => {
    const ruleObject = {
      id: nanoid(),
      field: 'First Name',
      operator: '=',
      value: '',
    };

    const newQueryObject = this.state.queryObject;
    newQueryObject.rules.push(ruleObject);

    const { id: idx } = newQueryObject.rules[newQueryObject.rules.length - 1];

    const rulesList = this.state.rulesList;
    rulesList.push({ id: idx });

    this.setState({
      rulesList: rulesList,
    });
  };

  render() {
    const rule = this.state.rulesList.map((item) => {
      return (
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
      );
    });

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
          <button className="btn-add-rule" onClick={this.addRule}>
            ADD RULE
          </button>
        </div>
        <ol className="rules-list">{rule}</ol>
      </div>
    );
  }
}

export default App;
