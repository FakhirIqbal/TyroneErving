export interface NotificProps {
  item?: {
    id?: number;
    day?: string;
    Noti?: Array<{
      id?: number;
      profileImag?: string; // Renamed for clarity
      name?: string;
      element?: string;
      createdAt?: string;
    }>;
  };
  index?: number;
}
