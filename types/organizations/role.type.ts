export type PermissionType =
  | 'DASHBOARD_VIEW'
  | 'CHARGERS_VIEW'
  | 'CHARGERS_UPDATE'
  | 'CHARGERS_CREATE'
  | 'CHARGERS_DELETE'
  | 'ORGANIZATIONS_VIEW'
  | 'ORGANIZATIONS_UPDATE'
  | 'ORGANIZATIONS_CREATE'
  | 'ORGANIZATIONS_DELETE'
  | 'USERS_LIST'
  | 'USERS_CREATE'
  | 'USERS_DELETE'
  | 'USERS_UPDATE'
  | 'USERS_VIEW'
  | 'ROLES_VIEW'
  | 'ROLES_UPDATE'
  | 'ROLES_DELETE'
  | 'ROLES_CREATE'
  | 'TRANSACTIONS_VIEW'
  | 'TRANSACTIONS_UPDATE'
  | 'TRANSACTIONS_DELETE'
  | 'TRANSACTIONS_CREATE';

export interface Role {
  _id: string;
  tenantId: string;
  name: string;
  description: string;
  permissions: PermissionType[];
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
