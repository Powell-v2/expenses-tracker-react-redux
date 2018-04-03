//////////////////////////
// Object destructuring //
//////////////////////////

// const person = {
//   name: 'Pavel',
//   age: 27,
//   location: {
//     city: 'Telde',
//     temp: 20
//   }
// }
//
// const {name: firstName = 'Anonymous', age} = person;
//
// console.log(`${firstName} is ${age}`);
//
// const {temp: temperature, city} = person.location;
//
// console.log(`It's ${temperature}°C in ${city}.`);

// const book = {
//   title: 'Ego is the Enemy',
//   author: 'Ryan Holiday',
//   publisher: {
//     name: 'Penguin'
//   }
// }
//
// const {name: publisherName = 'Self-published'} = book.publisher;
//
// console.log(`${publisherName}`);

/////////////////////////
// Array destructuring //
/////////////////////////

const address = ['1010 S Juniper Street', 'Philadelphia', 'Pensylvania', '19147'];

const [, , state = 'California'] = address;

console.log(`You are in ${state}.`);
