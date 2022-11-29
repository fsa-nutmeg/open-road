const db = require('../server/db');
const { faker } = require('@faker-js/faker')
/* user {
  userId : {
    identifier: STRING,
    likedTrips: [...tripIds],
    savedTrips: [tripids],
    takenTrips: [...tripIds],
    mileage: INT,
    admin: BOOLEAN,
    badges: [...badgeStrings],
  }
}

*/

const { getDatabase, ref, child, push, update } = require("firebase/database");

function createUser(identifier,likedTrips,savedTrips,takenTrips,mileage,admin,badges) {

  // A post entry.
  const postData = {
    identifier: identifier,
    likedTrips: likedTrips,
    savedTrips: savedTrips,
    takenTrips: takenTrips,
    mileage: mileage,
    admin: admin,
    badges: badges,
  };

  // Get a key for a new Post.
  const newPostKey = push(child(ref(db), 'users')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/users/' + newPostKey] = postData;

  update(ref(db), updates).then(()=>{console.log('SUCCEESSSSSSS')}).catch((err)=>{console.log(err)});
}

createUser('email@email.com',[1,2,3], [3,4,5],[10], 10000000, true, ['iron-booty']);

function random () {
  const size = Math.floor(Math.random()*3);
  if(size===0){return []};
  const result = new Set();
  for(let i = 0; i < size; i++){
    result.add(Math.ceil(Math.random()*20));
  }
  return [...result]
}

function randomBadges() {
  const result = [];
  if(Math.random()> 0.75){
    result.push('iron-butt');
  };
  if(Math.random()> 0.6){
    result.push('Trailblazer');
  };
  if(Math.random()> 0.1){
    result.push('open-roader');
  }

  return result;
}
for(let i = 0; i<20; i++){
  const identifier = faker.internet.email();
  const likedTrips = random();
  const savedTrips = random();
  const takenTrips = random();
  const mileage = Math.floor(Math.random()*999999999);
  const admin = false;
  const badges = randomBadges();
  createUser(identifier, likedTrips, savedTrips, takenTrips, mileage, admin, badges)
}
