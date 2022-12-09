const db = require('./seedDB');
const { faker } = require('@faker-js/faker');
const { getDatabase, ref, child, push, update } = require('firebase/database');
////////////////////////////////////////////////////////////////////////////////
// CREATING USER
////////////////////////////////////////////////////////////////////////////////

// Get a key for a new User.

const seedDB = async () => {
  const demoUserKey = 'djuVXqXc03Tz492ATtu6DgUIzzG2';
  const tripIds = [];

  const createTripIds = async () => {
    for (let i = 0; i < 4; i += 1) {
      let newKey = await push(child(ref(db), 'trips')).key;
      tripIds.push(newKey);
      await new Promise(resolve => setTimeout(resolve, 2200));
    }

    console.log(JSON.stringify('trip ids: ', tripIds));
  };

  await createTripIds();

  console.log(JSON.stringify('trip ids agin : ', tripIds));

  const updateUser = async () => {
    // A user entry.
    const userData = {
      identifier: 'demo@gmail.com',
      likedTrips: tripIds,
      savedTrips: tripIds,
      takenTrips: tripIds,
      badges: ['Iron-Butt', 'Trailblazer', 'Open-Roader'],
    };

    // Write the new user's data in the users list.
    const updates = {};
    updates['/users/' + demoUserKey] = userData;

    await update(ref(db), updates)
      .then(() => {
        console.log('updated user: ', demoUserKey);
      })
      .catch(err => {
        console.log(err);
      });
  };

  await updateUser();

  ////////////////////////////////////////////////////////////////////////////////
  // UPDATING TRIPS
  ////////////////////////////////////////////////////////////////////////////////

  const createTrip = async tripData => {
    // Get a key for a new Post.
    // Write the new trip's data in the trips list.
    const updates = {};
    updates['/trips/' + tripData.tripKey] = tripData;

    update(ref(db), updates)
      .then(() => {
        console.log('made trip: ', tripData.name);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const goingToTheSunRoad = {};

  goingToTheSunRoad.coordinates = require('./trips/goingToTheSunRoad.json');
  goingToTheSunRoad.name = 'Going-To-The-Sun Road';
  goingToTheSunRoad.owner = 'djuVXqXc03Tz492ATtu6DgUIzzG2';
  goingToTheSunRoad.curveFactor = 5.5;
  goingToTheSunRoad.likes = [1, 3, 5];
  goingToTheSunRoad.featured = true;
  goingToTheSunRoad.tripKey = tripIds[0];

  await createTrip(goingToTheSunRoad);

  const pacificCoastHighway = {};

  pacificCoastHighway.coordinates = require('./trips/pacificCoastHighway.json');
  pacificCoastHighway.name = 'Pacific Coast Highway';
  pacificCoastHighway.owner = 'djuVXqXc03Tz492ATtu6DgUIzzG2';
  pacificCoastHighway.curveFactor = 4;
  pacificCoastHighway.likes = [1, 2, 3, 4, 5];
  pacificCoastHighway.featured = true;
  goingToTheSunRoad.tripKey = tripIds[1];

  await createTrip(pacificCoastHighway);

  const peakToPeakHighway = {};

  peakToPeakHighway.coordinates = require('./trips/peakToPeakHighway.json');
  peakToPeakHighway.name = 'Peak to Peak Highway';
  peakToPeakHighway.owner = 'djuVXqXc03Tz492ATtu6DgUIzzG2';
  peakToPeakHighway.curveFactor = 3.9;
  peakToPeakHighway.likes = [1, 2, 7, 13];
  peakToPeakHighway.featured = true;
  goingToTheSunRoad.tripKey = tripIds[2];

  await createTrip(peakToPeakHighway);

  const guadalupeRiverRoad = {};

  guadalupeRiverRoad.coordinates = require('./trips/guadalupeRiverRoad.json');
  guadalupeRiverRoad.name = 'Guadalupe River Road';
  guadalupeRiverRoad.owner = 'djuVXqXc03Tz492ATtu6DgUIzzG2';
  guadalupeRiverRoad.curveFactor = 2.9;
  guadalupeRiverRoad.likes = [1, 2, 3, 4];
  guadalupeRiverRoad.featured = true;
  goingToTheSunRoad.tripKey = tripIds[3];

  await createTrip(guadalupeRiverRoad);
  console.log('created all trips!!!!!!!!!!!!\n\n');
};

seedDB();
