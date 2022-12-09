const db = require('./seedDB');
const { faker } = require('@faker-js/faker');
const { getDatabase, ref, child, push, update } = require('firebase/database');

const updateTrip = async tripData => {
  // Get a key for a new Post.
  // Write the new trip's data in the trips list.
  const updates = {};

  const tripKey = tripData.tripKey;
  delete tripData.tripKey;

  updates['/trips/' + tripKey] = tripData;

  await update(ref(db), updates);
  console.log('made trip: ', tripData.name);
};

const updateDb = async () => {
  const goingToTheSunRoad = {};

  goingToTheSunRoad.coordinates = require('./trips/goingToTheSunRoad.json');
  goingToTheSunRoad.name = 'Going-To-The-Sun Road';
  goingToTheSunRoad.owner = 'djuVXqXc03Tz492ATtu6DgUIzzG2';
  goingToTheSunRoad.tripKey = '-NIsenWctL3Vev1mmiYx';
  goingToTheSunRoad.img_url = './pics/goingToTheSunRoad.jpg';
  goingToTheSunRoad.featured = true;

  await updateTrip(goingToTheSunRoad);

  const pacificCoastHighway = {};

  pacificCoastHighway.coordinates = require('./trips/pacificCoastHighway.json');
  pacificCoastHighway.name = 'Pacific Coast Highway';
  pacificCoastHighway.owner = 'djuVXqXc03Tz492ATtu6DgUIzzG2';
  pacificCoastHighway.tripKey = '-NIsfmJbFP5uQPhaX_f0';
  pacificCoastHighway.img_url = './pics/pacificCoastHighway.jpg';
  pacificCoastHighway.featured = true;

  await updateTrip(pacificCoastHighway);

  const peakToPeakHighway = {};

  peakToPeakHighway.coordinates = require('./trips/peakToPeakHighway.json');
  peakToPeakHighway.name = 'Peak to Peak Highway';
  peakToPeakHighway.owner = 'djuVXqXc03Tz492ATtu6DgUIzzG2';
  peakToPeakHighway.tripKey = '-NIsfmJcByO7gpNaZ5Gm';
  peakToPeakHighway.img_url = './pics/peakToPeakHighway.jpg';
  peakToPeakHighway.featured = true;

  await updateTrip(peakToPeakHighway);

  const guadalupeRiverRoad = {};

  guadalupeRiverRoad.coordinates = require('./trips/guadalupeRiverRoad.json');
  guadalupeRiverRoad.name = 'Guadalupe River Road';
  guadalupeRiverRoad.owner = 'djuVXqXc03Tz492ATtu6DgUIzzG2';
  guadalupeRiverRoad.tripKey = '-NIsfmJgkZGe3Vpz35vx';
  guadalupeRiverRoad.img_url = './pics/guadalupeRiverRoad.jpg';
  guadalupeRiverRoad.featured = true;

  await updateTrip(guadalupeRiverRoad);
};

updateDb();
