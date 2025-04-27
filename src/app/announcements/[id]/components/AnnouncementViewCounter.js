import { useEffect } from 'react';
import axios from 'axios';

export default function AnnouncementViewCounter({ announcementId, userId }) {
  useEffect(() => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_ANNOUNCEMENTS_API_URL}/private/api/announcement/${announcementId}/view/${userId}`
      )
      .catch((error) => console.error('Erreur compteur de vues', error));
  }, [announcementId]);

  return null;
}
