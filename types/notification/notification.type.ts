export interface Notification {
  _id: string;
  userId: string;
  tittle: string;
  message: string;
  isRead: boolean;
  metadata: {
    ticketId: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}
