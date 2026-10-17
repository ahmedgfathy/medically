export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  region: string;
  address: string;
  rating: number;
  reviewCount: number;
  experience: number;
  consultationFee: number;
  initials: string;
  color: string;
  bio: string;
  latitude: number;
  longitude: number;
};

export const REGIONS = ['All areas', 'Central', 'North', 'South'];

export const SPECIALTIES = [
  'All specialties',
  'Family medicine',
  'Cardiology',
  'Pediatrics',
  'Dermatology',
  'Dentistry',
];

export const DOCTORS: Doctor[] = [
  {
    id: 'layla-haddad',
    name: 'Dr. Layla Haddad',
    specialty: 'Family medicine',
    region: 'Central',
    address: 'Health Avenue, Central District',
    rating: 4.9,
    reviewCount: 128,
    experience: 12,
    consultationFee: 25,
    initials: 'LH',
    color: '#DDF3EF',
    bio: 'A caring family physician focused on preventive care and supporting patients through every stage of life.',
    latitude: 31.9539,
    longitude: 35.9106,
  },
  {
    id: 'omar-khalil',
    name: 'Dr. Omar Khalil',
    specialty: 'Cardiology',
    region: 'Central',
    address: 'Wellness Street, Central District',
    rating: 4.8,
    reviewCount: 96,
    experience: 15,
    consultationFee: 40,
    initials: 'OK',
    color: '#E5E9FF',
    bio: 'Cardiologist providing thoughtful assessment, heart-health guidance, and long-term care plans.',
    latitude: 31.9622,
    longitude: 35.9251,
  },
  {
    id: 'sara-nasser',
    name: 'Dr. Sara Nasser',
    specialty: 'Pediatrics',
    region: 'North',
    address: 'Family Care Center, North District',
    rating: 5.0,
    reviewCount: 84,
    experience: 9,
    consultationFee: 30,
    initials: 'SN',
    color: '#FFF0D9',
    bio: 'Pediatrician who helps families feel informed and at ease, from routine checkups to common childhood concerns.',
    latitude: 32.018,
    longitude: 35.884,
  },
  {
    id: 'yazan-saleh',
    name: 'Dr. Yazan Saleh',
    specialty: 'Dermatology',
    region: 'North',
    address: 'Olive Plaza, North District',
    rating: 4.7,
    reviewCount: 72,
    experience: 11,
    consultationFee: 35,
    initials: 'YS',
    color: '#F9E4EA',
    bio: 'Dermatologist helping patients understand their skin and choose a treatment plan that fits their needs.',
    latitude: 32.025,
    longitude: 35.901,
  },
  {
    id: 'mariam-abbas',
    name: 'Dr. Mariam Abbas',
    specialty: 'Dentistry',
    region: 'South',
    address: 'Garden Medical Suites, South District',
    rating: 4.9,
    reviewCount: 113,
    experience: 10,
    consultationFee: 28,
    initials: 'MA',
    color: '#E6EFFB',
    bio: 'General dentist providing comfortable checkups, preventive advice, and clear explanations at every visit.',
    latitude: 31.891,
    longitude: 35.928,
  },
  {
    id: 'adam-faris',
    name: 'Dr. Adam Faris',
    specialty: 'Family medicine',
    region: 'South',
    address: 'Community Health Hub, South District',
    rating: 4.8,
    reviewCount: 67,
    experience: 8,
    consultationFee: 22,
    initials: 'AF',
    color: '#EAF1D9',
    bio: 'Family doctor committed to accessible, practical care and helping patients make confident health decisions.',
    latitude: 31.875,
    longitude: 35.899,
  },
];
