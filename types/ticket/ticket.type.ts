export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'CLOSED' | 'ESCALATED' | 'WAITING_CUSTOMER';

export interface Ticket {
  _id: string;
  tenantId: string;
  openedBy: {
    _id: string;
    name: string;
    email: string;
  };
  status: TicketStatus;
  priority: TicketPriority;
  subject: string;
  description: string;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
}
