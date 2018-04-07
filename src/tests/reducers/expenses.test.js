import moment from 'moment';
import expenses from '../fixtures/expenses';
import expensesReducer from '../../reducers/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, '@@INIT');

  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[0].id,
  };
  const state = expensesReducer(expenses, action);

  expect(state).toEqual([ expenses[1], expenses[2] ]);
});

test(`should not remove expense if id isn't found`, () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: -1,
  };
  const state = expensesReducer(expenses, action);

  expect(state).toEqual(expenses);
});

test(`should add an expense`, () => {
  const expense = {
    id: 10,
    description: '',
    note: '',
    amount: 0,
    createdAt: 0,
  };
  const action = {
    type: 'ADD_EXPENSE',
    expense
  };
  const state = expensesReducer(expenses, action);

  expect(state[state.length - 1]).toEqual(expense);
});

test(`should edit an expense`, () => {
  const updates = {
    description: 'xaxa',
  };
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[0].id,
    updates
  };
  const state = expensesReducer(expenses, action);

  expect(state[0].description).toBe(updates.description);
});

test(`should not edit an expense if id isn't found`, () => {
  const updates = {
    amount: 101,
  };
  const action = {
    type: 'EDIT_EXPENSE',
    id: -1,
    updates
  };
  const state = expensesReducer(expenses, action);

  expect(state).toEqual(expenses);
});
