import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup removeExpense action object', () => {
  const action = removeExpense(123);

  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: 123
  });
});

test('should setup editExpense action object', () => {
  const action = editExpense(321, { note: 'philosophical musings' });

  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: 321,
    updates: {
      note: 'philosophical musings'
    }
  });
});

test('should setup addExpense action object with provided values', () => {
  const expenseData = {
    description: 'rent',
    amount: 2020,
    createdAt: 350000,
    note: 'last payment before moving out'
  };
  const action = addExpense(expenseData);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  });
});

test('should setup addExpense action object with default values', () => {
  const action = addExpense();

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description: '',
      note: '',
      amount: 0,
      createdAt: 0
    }
  });
});
