const db = require('../server/db');
const { faker } = require('@faker-js/faker');
const { getDatabase, ref, child, push, update } = require('firebase/database');
////////////////////////////////////////////////////////////////////////////////
// CREATING USERS
////////////////////////////////////////////////////////////////////////////////
const createUser = (
  refId,
  identifier,
  likedTrips,
  savedTrips,
  takenTrips,
  mileage,
  admin,
  badges
) => {
  // A user entry.
  const userData = {
    refId: refId,
    identifier: identifier,
    likedTrips: likedTrips,
    savedTrips: savedTrips,
    takenTrips: takenTrips,
    mileage: mileage,
    admin: admin,
    badges: badges,
  };

  // Get a key for a new User.
  const newUserKey = push(child(ref(db), 'users')).key;

  // Write the new user's data in the users list.
  const updates = {};
  updates['/users/' + newUserKey] = userData;

  update(ref(db), updates)
    .then(() => {
      console.log('made user: ', userData.identifier);
    })
    .catch(err => {
      console.log(err);
    });
};

function randomArrayOfInts() {
  const size = Math.floor(Math.random() * 3);
  if (size === 0) {
    return [];
  }
  const result = new Set();
  for (let i = 0; i < size; i++) {
    result.add(Math.ceil(Math.random() * 20));
  }
  return [...result];
}

function randomBadges() {
  const result = [];
  if (Math.random() > 0.75) {
    result.push('iron-butt');
  }
  if (Math.random() > 0.6) {
    result.push('Trailblazer');
  }
  if (Math.random() > 0.1) {
    result.push('open-roader');
  }

  return result;
}

// Create 20 users
for (let i = 0; i < 20; i++) {
  const refId = i + 1;
  const identifier = faker.internet.email();
  const likedTrips = randomArrayOfInts();
  const savedTrips = randomArrayOfInts();
  const takenTrips = randomArrayOfInts();
  const mileage = Math.floor(Math.random() * 999999999);
  const admin = false;
  const badges = randomBadges();

  createUser(
    refId,
    identifier,
    likedTrips,
    savedTrips,
    takenTrips,
    mileage,
    admin,
    badges
  );
}
console.log('created all users!!!!!!!!!!!!\n\n');
////////////////////////////////////////////////////////////////////////////////
// CREATING TRIPS
////////////////////////////////////////////////////////////////////////////////
const createTrip = tripData => {
  // Get a key for a new Post.
  const newTripKey = push(child(ref(db), 'trips')).key;

  // Write the new trip's data in the trips list.
  const updates = {};
  updates['/trips/' + newTripKey] = tripData;

  update(ref(db), updates)
    .then(() => {
      console.log('made trip: ', tripData.name);
    })
    .catch(err => {
      console.log(err);
    });
};

let tripId = 1;

const goingToTheSunRoad = {};

goingToTheSunRoad.coordinates = require('./trips/goingToTheSunRoad.json');
goingToTheSunRoad.name = 'Going-To-The-Sun Road';
goingToTheSunRoad.owner = 1;
goingToTheSunRoad.curveFactor = 5.5;
goingToTheSunRoad.likes = [1, 3, 5, 44, 66];
goingToTheSunRoad.featured = true;
goingToTheSunRoad.refId = tripId++;

createTrip(goingToTheSunRoad);

const pacificCoastHighway = {};

pacificCoastHighway.coordinates = require('./trips/pacificCoastHighway.json');
pacificCoastHighway.name = 'Pacific Coast Highway';
pacificCoastHighway.owner = 1;
pacificCoastHighway.curveFactor = 4;
pacificCoastHighway.likes = [1, 2, 3, 4, 5];
pacificCoastHighway.featured = true;
pacificCoastHighway.refId = tripId++;

createTrip(pacificCoastHighway);

const peakToPeakHighway = {};

peakToPeakHighway.coordinates = require('./trips/peakToPeakHighway.json');
peakToPeakHighway.name = 'Peak to Peak Highway';
peakToPeakHighway.owner = 2;
peakToPeakHighway.curveFactor = 3.9;
peakToPeakHighway.likes = [1, 2, 7, 13];
peakToPeakHighway.featured = true;
peakToPeakHighway.refId = tripId++;

createTrip(peakToPeakHighway);

const guadalupeRiverRoad = {};

guadalupeRiverRoad.coordinates = require('./trips/guadalupeRiverRoad.json');
guadalupeRiverRoad.name = 'Guadalupe River Road';
guadalupeRiverRoad.owner = 3;
guadalupeRiverRoad.curveFactor = 2.9;
guadalupeRiverRoad.likes = [1, 2, 3, 4];
guadalupeRiverRoad.featured = true;
guadalupeRiverRoad.refId = tripId++;

createTrip(guadalupeRiverRoad);
console.log('created all trips!!!!!!!!!!!!\n\n');
////////////////////////////////////////////////////////////////////////////////
// CREATING COMMENTS
////////////////////////////////////////////////////////////////////////////////
const createComment = commentData => {
  // Get a key for a new Post.
  const newCommentKey = push(child(ref(db), 'comments')).key;

  // Write the new trip's data in the trips list.
  const updates = {};
  updates['/comments/' + newCommentKey] = commentData;

  update(ref(db), updates)
    .then(() => {
      console.log('made comment: ', commentData.refId);
    })
    .catch(err => {
      console.log(err);
    });
};

for (let i = 0; i < 25; i += 1) {
  const comment = {};

  comment.refId = i + 1;
  comment.userId = Math.ceil(Math.random() * 20);
  comment.routeId = Math.ceil(Math.random() * 4);
  comment.text = faker.lorem.text();

  createComment(comment);
}

console.log('created all comments!!!!!!!!!!!!\n\n');
