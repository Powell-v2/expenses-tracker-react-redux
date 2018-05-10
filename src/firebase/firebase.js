import * as firebase from 'firebase';

const config = {
  apiKey: "#huy#",
  authDomain: "#huy#",
  databaseURL: "#huy#",
  projectId: "#huy#",
  storageBucket: "#huy#",
  messagingSenderId: "#huy#",
};

firebase.initializeApp(config);

const db = firebase.database();

export { firebase, db as default };
