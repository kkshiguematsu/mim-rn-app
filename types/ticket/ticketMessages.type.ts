export enum MessageType {
  STATUS_CHANGE = 'status_change',
  SENT = 'sent',
  RECEIVED = 'received',
}

export enum MessagePosition {
  SINGLE = 'single',
  FIRST = 'first',
  MIDDLE = 'middle',
  LAST = 'last',
}

export interface TicketMessageSender {
  _id: string;
  name: string;
  email: string;
  isSuperAdmin?: boolean;
  avatarUrl?: string;
}

export interface TicketMessage {
  _id: string;
  ticketId: string;
  senderId: TicketMessageSender;
  message: string;
  attachments: string[];
  isInternal: boolean;
  isStatusChange: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
