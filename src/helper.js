import { nanoid } from 'nanoid';

export const updateRulesList = (queryObject, rulesList) => {
  const ruleObject = {
    id: nanoid(),
    field: 'First Name',
    operator: '=',
    value: '',
  };
  queryObject.rules.push(ruleObject);
  const { id: idx, value } = queryObject.rules[queryObject.rules.length - 1];
  rulesList.push({
    id: idx,
    isValid: true,
    errorMessage: '',
    value,
  });

  const updatedRules = queryObject.rules;

  return {
    rulesList,
    updatedRules,
  };
};

export const deleteRule = (queryObject, rulesList, id) => {
  const updatedRulesList = rulesList.filter((item) => item.id !== id);
  const newQueryObject = queryObject;
  const filteredRules = newQueryObject.rules.filter((rule) => rule.id !== id);

  newQueryObject.rules = filteredRules;

  return {
    updatedRulesList,
    filteredRules,
  };
};

export const onEventChange = (queryObject, key, event, idx) => {
  queryObject.rules.forEach((rule) => {
    if (rule.id === idx) {
      const currentRule = rule;
      currentRule[key] = event.trim();
    }
  });
  const updatedRules = queryObject.rules;

  return { queryObject, updatedRules };
};

const validateName = (inputString) => {
  const reg = /^[\p{L}]+$/u;
  const isValid = reg.test(inputString);

  return isValid;
};

const validateAge = (inputString) => {
  const reg = /^(?:[0-9]|[1-9][0-9]|1[0-2][0-9]|130)$/;
  const isValid = reg.test(inputString);

  return isValid;
};

const validateLevel = (inputString) => {
  const reg = /^[0-9]{1,6}$/;
  const isValid = reg.test(inputString);

  return isValid;
};

const validateEnrollmentYear = (inputString) => {
  const reg = /^(?!0)[0-9]{4}$/;
  const isValid = reg.test(inputString);

  return isValid;
};

export const validateInput = (queryObject, event, idx) => {
  let isValid = true;
  let errorMessage = '';

  queryObject.rules.forEach((rule) => {
    if (rule.id === idx) {
      const currentRule = rule;
      if (
        currentRule.field === 'First Name' ||
        currentRule.field === 'Last Name'
      ) {
        isValid = validateName(event);
        errorMessage = 'Invalid name';
      }

      if (currentRule.field === 'Age') {
        isValid = validateAge(event);
        errorMessage = 'Invalid age';
      }

      if (currentRule.field === 'Level') {
        isValid = validateLevel(event);
        errorMessage = 'Invalid level';
      }

      if (currentRule.field === 'Enrollment Year') {
        isValid = validateEnrollmentYear(event);
        errorMessage = 'Invalid year';
      }
    }
  });

  return { isValid, errorMessage };
};
