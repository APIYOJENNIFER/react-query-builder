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

  logical = logicalOperators.map((item, id) => {
    return <option key={id}>{item}</option>;
  });

  onSelectOptionChanged = (event) => {
    const newQueryObject = this.state.queryObject;
    newQueryObject.combinator = event.target.value;
    this.setState({ queryObject: newQueryObject });
  };

  field = studentsInfo.map((item, id) => {
    return <option key={id}>{item}</option>;
  });

  onFieldOptionChanged = (event, idx) => {
    const newQueryObject = this.state.queryObject;
    newQueryObject.rules.forEach((rule) => {
      if (rule.id === idx) {
        rule.field = event.target.value;
      }
    });
    this.setState({ queryObject: newQueryObject });
  };

  comparison = comparisonOperators.map((item, id) => {
    return <option key={id}>{item}</option>;
  });

  onComparisonOptionChanged = (event, idx) => {
    const newQueryObject = this.state.queryObject;
    newQueryObject.rules.forEach((rule) => {
      if (rule.id === idx) {
        rule.operator = event.target.value;
      }
    });
    this.setState({ queryObject: newQueryObject });
  };

  onValueChanged = (event, idx) => {
    const newQueryObject = this.state.queryObject;
    newQueryObject.rules.forEach((rule) => {
      if (rule.id === idx) {
        rule.value = event.target.value;
      }
    });
    this.setState({ queryObject: newQueryObject });
  };

  onDelete = (id) => {
    const rulesList = this.state.rulesList.filter((item) => {
      return item.key !== id;
    });

    const newQueryObject = this.state.queryObject;
    const filteredRules = newQueryObject.rules.filter((rule) => {
      return rule.id !== id;
    });

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
    this.setState({
      rulesList: rulesList.concat(
        <Rule
          id={idx}
          key={idx}
          field={this.field}
          onFieldChanged={(event) => this.onFieldOptionChanged(event, idx)}
          operator={this.comparison}
          onOperatorChanged={(event) =>
            this.onComparisonOptionChanged(event, idx)
          }
          onValueChanged={(event) => this.onValueChanged(event, idx)}
          onDelete={() => this.onDelete(idx)}
        />
      ),
    });
  };

  render() {
    return (
      <div className="App">
        <div className="App-heading">
          <h2>React Query Builder</h2>
        </div>
        <hr />
        <div className="App-top-section">
          <select
            className="logical-select"
            onChange={this.onSelectOptionChanged}
          >
            {this.logical}
          </select>
          <button className="btn-add-rule" onClick={this.addRule}>
            ADD RULE
          </button>
        </div>
        <ol className="rules-list">{this.state.rulesList}</ol>
      </div>
    );
  }
}

export default App;
