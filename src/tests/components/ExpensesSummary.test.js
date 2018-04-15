import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('should render ExpensesSummary correctly with 1 expense', () => {
  const wrapper = shallow(
    <ExpensesSummary
      expenseCount={1}
      expensesTotal={22}
    />);

  expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary correctly with 2 expenses', () => {
  const wrapper = shallow(
    <ExpensesSummary
      expenseCount={2}
      expensesTotal={450050}
    />);

  expect(wrapper).toMatchSnapshot();
});
