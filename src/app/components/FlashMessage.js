import { useFlashMessage } from '../contexts/FlashMessageContext';
import React from 'react';

export default function FlashMessage() {
  const { flashMessage } = useFlashMessage();

  if (!flashMessage) return null;

  return (
    <div className={`alert alert-${flashMessage.type} float-end`}>
      {flashMessage.message}
    </div>
  );
}
