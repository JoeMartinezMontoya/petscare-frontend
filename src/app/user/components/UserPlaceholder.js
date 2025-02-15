import React from 'react';

export default function UserPlaceholder() {
  return (
    <div className='row my-4 align-items-center'>
      <img
        src='https://placehold.co/200x200'
        className='col-2'
        alt='placeholder'
      />
      <h1 className='petscare-brand col-10'>
        Bonjour
        <div className='placeholder-wave d-inline mx-2'>
          <span className='placeholder col-10'></span>
        </div>
      </h1>

      <table className='table table-borderless'>
        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr className='placeholder-wave' key={i}>
              <th scope='row'>
                <span className='placeholder col-8'></span>
              </th>
              <td colSpan='2'>
                <span className='placeholder col-12'></span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
