import { BenefitsTileProps } from '../../components/BenefitsTile';
import { PlanProps } from '../../components/PlanTile';
import { TrainerPreviewProps } from '../../components/TrainerPreview/TrainerPreview.types';

export const placeGridCenter = {
  justifyContent: 'center',
  alignItems: 'center',
};

export const benefits: BenefitsTileProps[] = [
  {
    title: 'Personalized Trainings',
    description:
      'Achieve your fitness goals with custom-tailored workout programs designed specifically for you.',
    alt: 'personal-trainer-image1',
    imgSrc: 'pexels_1.jpg',
  },
  {
    title: 'Expert Guidance',
    description:
      'Receive professional guidance and advice from experienced personal trainers who will help you optimize your workouts.',
    alt: 'personal-trainer-image2',
    imgSrc: 'pexels_2.jpg',
    reverse: true,
  },
  {
    title: 'Motivation and Accountability',
    description:
      'Stay motivated and accountable with dedicated personal trainers who will support you throughout your fitness journey.',
    alt: 'personal-trainer-image3',
    imgSrc: 'pexels_3.jpg',
  },
  {
    title: 'Customized Nutrition Guidance',
    description:
      'Get personalized nutrition guidance to complement your workouts and achieve optimal results.',
    alt: 'personal-trainer-image4',
    imgSrc: 'pexels_4.jpg',
    reverse: true,
  },
];

export const StepsItems = [
  {
    title: 'Contact',
    description: 'Explore our coaches and contact one of them using direct message',
    icon: 'description',
  },
  {
    title: 'Chat',
    description: 'Have a chat with coach and tell them what you want to achieve',
    icon: 'forum',
  },
  {
    title: 'Select your plan',
    description: 'Register using link sent to you by coach and choose plan that suits you best!',
    icon: 'local_mall',
  },
  {
    title: 'Chase your goals',
    description: 'Coach will try his best to help you achieve your dream body!',
    icon: 'fitness_center',
    last: true,
  },
];

export const plans: PlanProps[] = [
  {
    planName: 'Diet Plan',
    planCost: 15,
    planDescription: [
      '✔ Personalized meal plans tailored to your dietary needs',
      '✔ Expert recommendations for balanced nutrition and healthy eating habits',
      '✔ Regular assessments and adjustments to optimize your progress',
      '✔ Access to a variety of delicious and nutritious recipes',
      '✔ Ongoing guidance and support from our nutrition experts',
    ],
    small: true,
  },
  {
    header: '★ Best Value Offer ★',
    planName: 'Diet + Training Plan',
    planCost: 25,
    planDescription: [
      '✔ Personalized meal plans and customized workout routines',
      '✔ Expert guidance and support for optimal progress',
      '✔ Stay motivated and accountable throughout your fitness journey',
      '✔ Achieve faster and more effective results',
      '✔ Priority access to personalized consultations with coach',
    ],
  },
  {
    planName: 'Training Plan',
    planCost: 15,
    planDescription: [
      '✔ Customized workout routines designed to target your individual needs and goals',
      '✔ Professionally crafted exercises to maximize your results',
      '✔ Ongoing monitoring and adjustments to ensure continuous progress',
      '✔ Access to a variety of training programs for different fitness levels and preferences',
      '✔ Expert guidance and support from our certified trainers',
    ],
    small: true,
  },
];

export const mockCoaches: TrainerPreviewProps[] = [
  {
    avatar:
      'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    firstName: 'John',
    lastName: 'Doe',
    specialization: 'Calisthenics',
    description:
      'I am a personal coach of calisthenics, dedicated to empowering individuals to reach their full potential through customized programs and unwavering support, guiding them towards remarkable strength, flexibility, and overall fitness.',
  },
  {
    avatar:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    firstName: 'Emily',
    lastName: 'Smith',
    specialization: 'Swimming',
    description:
      'I am a personal swimming coach, committed to helping individuals unlock their swimming prowess by providing personalized training programs, refining technique, and instilling a love for the water, enabling them to achieve their swimming goals with confidence.',
  },
  {
    avatar:
      'https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    firstName: 'Michael',
    lastName: 'Johnson',
    specialization: 'Marathon Running',
    description:
      'As a personal coach specializing in marathon running, I empower athletes to conquer long distances by creating tailored training plans, optimizing endurance, and instilling mental toughness, guiding them towards crossing the finish line with pride.',
  },
  {
    avatar:
      'https://images.pexels.com/photos/991199/pexels-photo-991199.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    firstName: 'Sarah',
    lastName: 'Lee',
    specialization: 'Yoga',
    description:
      'Im a personal yoga coach, devoted to helping individuals find balance, strength, and inner peace through customized yoga practices, mindful breathing techniques, and guidance in achieving physical and mental well-being.',
  },
];
