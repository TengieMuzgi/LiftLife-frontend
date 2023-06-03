import { TrainerPreviewProps } from '../TrainerPreview';
import { TabProps } from './ProfileDashboard.types';

export const mockTrainer: TrainerPreviewProps = {
  avatar:
    'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  firstName: 'Emily',
  lastName: 'Smith',
  specialization: 'Swimming',
  description:
    'I am a personal swimming coach, committed to helping individuals unlock their swimming prowess by providing personalized training programs, refining technique, and instilling a love for the water, enabling them to achieve their swimming goals with confidence.',
};

export const userTabsLabels: TabProps[] = [
  {
    label: 'My Workouts',
    id: 'workouts-tab',
    'aria-controls': 'workouts-tabpanel',
  },
  {
    label: 'My Diet',
    id: 'diet-tab',
    'aria-controls': 'diet-tabpanel',
  },
  {
    label: 'My Coach',
    id: 'coach-tab',
    'aria-controls': 'coach-tabpanel',
  },
  {
    label: 'Explore trainers',
    id: 'explore-tab',
    'aria-controls': 'explore-tabpanel',
  },
];

export const coachTabsLabels: TabProps[] = [
  {
    label: 'Training Builder',
    id: 'training-tab',
    'aria-controls': 'training-builder-tabpanel',
  },
  {
    label: 'Diet Builder',
    id: 'diet-builder-tab',
    'aria-controls': 'diet-builder-tabpanel',
  },
  {
    label: 'My Bio',
    id: 'bio-tab',
    'aria-controls': 'bio-tabpanel',
  },
  {
    label: 'My Clients',
    id: 'clients-tab',
    'aria-controls': 'clients-tabpanel',
  },
];
