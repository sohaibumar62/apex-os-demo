export type DispatchStatus =
  | 'Pending'
  | 'Assigned'
  | 'En Route'
  | 'In Transit'
  | 'Delivered';

export interface Dispatch {
  id: string;
  client: string;
  pickup: string;
  destination: string;
  driver: string | null;
  status: DispatchStatus;
  temperature: number | null;
}