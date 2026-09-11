import type { Dispatch } from '../types/dispatch';

export const mockDispatches: Dispatch[] = [
  {
    id: 'APX-1024',
    client: 'Pacific Diagnostics',
    pickup: 'Mission Viejo',
    destination: 'Irvine',
    driver: 'Daniel Carter',
    status: 'In Transit',
    temperature: 38.6,
  },
  {
  id: 'APX-1027',
  client: 'Pacific Diagnostics',
  pickup: 'Irvine',
  destination: 'Mission Viejo',
  driver: 'James Walker',
  status: 'Delivered',
  temperature: 37.9,
},
  {
    id: 'APX-1025',
    client: 'South Coast Labs',
    pickup: 'Laguna Hills',
    destination: 'Newport Beach',
    driver: 'Michael Reed',
    status: 'En Route',
    temperature: 39.1,
  },
  {
    id: 'APX-1026',
    client: 'OC Clinical Services',
    pickup: 'Aliso Viejo',
    destination: 'Mission Viejo',
    driver: null,
    status: 'Pending',
    temperature: null,
  },
];