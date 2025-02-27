import React, { useState } from 'react';

export default function PasswordInput({
  label,
  name,
  value,
  onChange,
  error,
  success,
  onBlur,
}) {
  const [showPassword, setShowPassword] = useState(false);

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
      <div className='input-group'>
        <input
          type={showPassword ? 'text' : 'password'}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`form-control ${
            error ? 'is-invalid' : success ? 'is-valid' : ''
          }`}
        />
        <button
          type='button'
          className={`btn btn-outline-${
            error ? 'secondary' : success ? 'primary' : 'dark'
          }`}
          onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? '🙈' : '👁️'}
        </button>
      </div>
    </div>
  );
}
