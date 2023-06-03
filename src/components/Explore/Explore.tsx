import React, { useContext, useState, useEffect } from 'react';
import { Carousel } from '../Carousel';
import { AppContext } from '../../App';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { storage } from '../../pages/SignIn/firebase';
import { getDownloadURL, ref } from '@firebase/storage';
import { useSnackbar } from '../../hooks/useSnackbar';
import { Snackbar } from '../Snackbar/Snackbar';

type coachProps = {
  firstName: string;
  lastName: string;
  specialization: string;
  description: string;
  id: string;
  avatar?: string;
};

export const Explore = () => {
  const [coaches, setCoaches] = useState<coachProps[]>([]);
  const [snackbarState, showSnackbar, hideSnackbar] = useSnackbar();

  /**
   * Query to get data about coaches
   * Also downloads coach avatar from firebase storage
   */
  const { isLoading, isError, data, error } = useQuery(['coaches'], async () => {
    const { data } = await axios.get('http://localhost:8081/api/user/coaches');
    const coachesData: coachProps[] = data;
    const coachesWithAvatars = await Promise.all(
      coachesData.map(async coach => {
        const storageRef = ref(storage, `${coach.id}`);
        try {
          const avatarURL = await getDownloadURL(storageRef);
          return { ...coach, avatar: avatarURL };
        } catch (error) {
          if (error instanceof Error) {
            return { ...coach, avatar: '' };
          } else {
            showSnackbar('Something unexpected happened!', 'error');
          }
        }
      })
    );
    return coachesWithAvatars;
  });

  useEffect(() => {
    if (data) {
      const coachesData = data as coachProps[];
      setCoaches(coachesData);
    }
  }, [data]);

  const { isMobile } = useContext(AppContext);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError && error instanceof Error) {
    showSnackbar(error.message, 'error');
  }

  return (
    <>
      <Carousel trainers={coaches} slidesPerView={isMobile ? 1 : 3} />
      {snackbarState && (
        <Snackbar
          isOpen={true}
          message={snackbarState.message}
          severity={snackbarState.severity}
          onClose={hideSnackbar}
        />
      )}
    </>
  );
};
