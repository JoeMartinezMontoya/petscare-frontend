import { useEffect } from 'react';
import axios from 'axios';

export default function AnnouncementViewCounter({ announcementId }) {
  useEffect(() => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_ANNOUNCEMENTS_API_URL}/public/api/announcements/${announcementId}/view`
      )
      .catch((error) => console.error('Erreur compteur de vues', error));
  }, [announcementId]);

  return null;
}
