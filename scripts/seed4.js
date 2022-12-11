const db = require('./seedDB');
const { faker } = require('@faker-js/faker');
const { getDatabase, ref, child, push, update } = require('firebase/database');

const seed4 = async () => {
  const createTrip = async tripData => {
    // Get a key for a new Post.
    const newTripKey = push(child(ref(db), 'trips')).key;
    // Write the new trip's data in the trips list.
    const updates = {};
    updates['/trips/' + newTripKey] = tripData;

    await update(ref(db), updates);
    console.log('added trip: ', tripData.name);
  };

  const badlands = {};

  badlands.coordinates = require('./trips/badlands.json');
  badlands.name = 'Badlands';
  badlands.owner = 1;
  badlands.curveFactor = 5.5;
  badlands.likes = [1, 3, 5];
  badlands.featured = true;
  badlands.img_url = './pics/goingToTheSunRoad.jpg';
  badlands.featured = true;

  await createTrip(badlands);

  const tailOfTheDragon = {};

  tailOfTheDragon.coordinates = require('./trips/tailOfTheDragon.json');
  tailOfTheDragon.name = 'Tail of the Dragon';
  tailOfTheDragon.owner = 1;
  tailOfTheDragon.curveFactor = 5.5;
  tailOfTheDragon.likes = [1, 3, 5];
  tailOfTheDragon.featured = true;
  tailOfTheDragon.img_url = './pics/tailOfTheDragon.jpg';
  tailOfTheDragon.featured = true;

  await createTrip(tailOfTheDragon);

  const tunnelOfTrees = {};

  tunnelOfTrees.coordinates = require('./trips/tunnelOfTrees.json');
  tunnelOfTrees.name = 'Tunnel of Trees';
  tunnelOfTrees.owner = 1;
  tunnelOfTrees.curveFactor = 5.5;
  tunnelOfTrees.likes = [1, 3, 5];
  tunnelOfTrees.featured = true;
  tunnelOfTrees.img_url = './pics/tunnelOfTrees.jpg';
  tunnelOfTrees.featured = true;

  await createTrip(tunnelOfTrees);
};

seed4();
