import React from 'react';
import Map from './map/Map';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchTrip } from '../store/reducers/trip';
import MapAnimation from './map/MapAnimation';
import descriptions from '../descriptions.json';

const SingleTrip = props => {
  const dispatch = useDispatch();
  const { trip } = useSelector(state => state.trip);

  const path = useLocation().pathname;
  const tripIdx = path.indexOf('/trips/');

  // trip id can be passed through local storage or in the url path
  // the url path trip id will take priority
  const tripId =
    tripIdx === -1 ? localStorage.getItem('tripId') : path.slice(tripIdx + 7);

  if (trip?.id !== tripId) {
    dispatch(fetchTrip(tripId));
    return <div>Loading Trip...</div>;
  }

  const { coordinates, curveFactor, likes, name, owner } = trip;
  return (
    <div>
      <div className='flex justify-center'>
        <div className='parent'>
          <Map coordinates={trip.coordinates} />
          <MapAnimation coordinates={trip.coordinates} />
        </div>
      </div>
      <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
        <div className='px-4 py-5 sm:px-6'>
          <h3 className='text-lg font-medium leading-6 text-gray-900'>
            Trip Information
          </h3>
          <p className='mt-1 max-w-2xl text-sm text-gray-500'>
            Personal details and application.
          </p>
        </div>
        <div className='border-t border-gray-200'>
          <dl>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Name</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {name}
              </dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Owner</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {owner}
              </dd>
            </div>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Likes</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {likes}
              </dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>
                Curve Factor
              </dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {curveFactor}
              </dd>
            </div>
            <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>About</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                {descriptions[name] || descriptions['default']}
              </dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-sm font-medium text-gray-500'>Coordinates</dt>
              <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                <ul className='divide-y divide-gray-200 rounded-md border border-gray-200'>
                  <li className='flex items-center justify-between py-3 pl-3 pr-4 text-sm'>
                    <div className='flex w-0 flex-1 items-center'>
                      {coordinates.map(tuple => (
                        <p>{`[${tuple[0]}, ${tuple[1]}]`}</p>
                      ))}
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default SingleTrip;
