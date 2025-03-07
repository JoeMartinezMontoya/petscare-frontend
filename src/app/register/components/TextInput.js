import React from 'react';

export default function TextInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  success,
  onBlur,
}) {
  return (
    <div className='mb-3'>
      <div className='d-flex justify-content-between align-items-center'>
        <label
          htmlFor={name}
          className={`form-label mb-0 
            ${error ? 'text-danger' : success ? 'text-success' : ''}`}>
          {label}
        </label>
        {error && <span className='text-danger petscare-small'>{error}</span>}
        {!error && success && (
          <span className='text-success petscare-small'>Valide</span>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`form-control ${
          error ? 'is-invalid' : success ? 'is-valid' : ''
        }`}
      />
    </div>
  );
}
