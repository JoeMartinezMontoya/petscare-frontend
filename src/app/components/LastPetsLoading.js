import React from 'react';

export default function LastPetsLoading() {
  return (
    <div className='row'>
      <div className='col-12 p-5'>
        <h2 className='petscare-brand'>
          On charge les derniers animaux pour vous
        </h2>
        <div className='row mt-3 justify-content-between'>
          {[...Array(5)].map((_, i) => (
            <div className='col-2' key={i}>
              <div className='card petscare-background'>
                <img
                  className='card-img-top'
                  src='https://placedog.net/600/600'
                  alt='loading'
                />
                <div className='card-body mh-100  placeholder-wave'>
                  <h5 className='card-title text-center placeholder col-12'></h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
