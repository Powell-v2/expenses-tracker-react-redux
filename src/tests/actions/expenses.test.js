import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense,
  startRemoveExpense,
  setExpenses,
  startSetExpenses,
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import db from '../../firebase/firebase';

const createMockStore = configureMockStore([ thunk ]);

beforeEach((done) => {
  const expensesData = {};

  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });

  db.ref('expenses').set(expensesData).then(done).catch(done);
});

test('should setup removeExpense action object', () => {
  const action = removeExpense(123);

  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: 123
  });
});

test('should remove expense from firebase db', (done) => {
  const store = createMockStore({});
  const id = expenses[2].id;

  store.dispatch(startRemoveExpense(id)).then(() => {
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id,
    });

    return db.ref(`expenses/${id}`).once('value');
  })
  .then((snapshot) => {
    expect(snapshot.val()).toBe(null);
    done();
  })
  .catch(done);
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
  const action = addExpense(expenses[1]);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[1],
  });
});

test('should add expense to db and store', (done) => {
  const store = createMockStore({});
  const expense = {
    description: 'bike',
    amount: 200000,
    note: 'full suspension',
    createdAt: 101010101010
  };

  store.dispatch(startAddExpense(expense))
    .then(() => {
      const actions = store.getActions();

      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expense,
        }
      });

      return db.ref(`expenses/${actions[0].expense.id}`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expense);
      done();
    })
    .catch(done);
});

test('should add expense with defaults to db and store', (done) => {
  const store = createMockStore({});
  const defaults = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0,
  };

  store.dispatch(startAddExpense({}))
    .then(() => {
      const actions = store.getActions();

      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...defaults,
        }
      });

      return db.ref(`expenses/${actions[0].expense.id}`).once('value');
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(defaults);
      done();
    })
    .catch(done);
});

test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);

  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses,
  })
});

test('should fetch the expenses from firebase db', (done) => {
  const store = createMockStore({});

  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses,
    });

    done();
  }).catch(done);
});
