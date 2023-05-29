import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Logical from './Logical';

import {
  changeInputPlaceHolder,
  deleteRule,
  onEventChange,
  updateRulesList,
  validateInput,
} from '../helper';
import Rules from './Rules';
import GeneralButton from './GeneralButton';
import QueryOutput from './QueryOutput';
import withBackgroundColor from './withBackgroundColor';

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

  componentDidMount() {
    this.addRule();
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

    const placeHolder = changeInputPlaceHolder(event);

    const { rulesList, queryObject } = this.state;
    this.setState({
      rulesList: rulesList.map((rule) =>
        rule.id === idx
          ? {
              ...rule,
              isValid: true,
              errorMessage: '',
              value: '',
              placeHolder,
              selectedValue: event,
            }
          : rule
      ),
      queryObject: {
        ...queryObject,
        rules: queryObject.rules.map((rule) =>
          rule.id === idx ? { ...rule, value: '' } : rule
        ),
      },
    });
  };

  handleOperatorChange = (event, idx) => {
    this.handleEventChange('operator', event, idx);

    const { rulesList } = this.state;
    this.setState({
      rulesList: rulesList.map((rule) =>
        rule.id === idx
          ? {
              ...rule,
              selectedOperator: event,
            }
          : rule
      ),
    });
  };

  handleValueChange = (event, idx) => {
    const { queryObject, rulesList } = this.state;
    const validationResult = validateInput(queryObject, event, idx);

    this.setState({
      rulesList: rulesList.map((rule) =>
        rule.id === idx
          ? {
              ...rule,
              isValid: validationResult.isValid,
              errorMessage: validationResult.errorMessage,
              value: event,
            }
          : rule
      ),
    });

    if (validationResult.isValid) {
      this.handleEventChange('value', event, idx);
    }
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
    const AddRuleButton = withBackgroundColor(
      GeneralButton,
      '#319431',
      this.addRule,
      'ADD RULE'
    );

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
          <AddRuleButton />
        </div>
        <div className="rules">
          <Rules
            rulesList={rulesList}
            onFieldChange={this.handleFieldChange}
            onOperatorChange={this.handleOperatorChange}
            onValueChange={this.handleValueChange}
            onDelete={this.handleDelete}
          />
        </div>
        <QueryOutput queryObject={queryObject} />
      </div>
    );
  }
}

export default Query;
