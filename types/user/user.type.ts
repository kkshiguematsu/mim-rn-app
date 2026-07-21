import { Role } from '@/types/organizations/role.type';
import { Tenant } from '@/types/organizations/tenant.type';
import { UserPaymentCard } from '@/types/payment/userPaymentCard.type';
import { GatewayProviders } from '../payment/payment.type';

export interface User {
  _id: string;
  tenantId: Tenant;
  roleId: Role;
  name: string;
  email: string;
  taxId: string;
  phone: string;
  isSuperAdmin: boolean;
  notificationPermissions: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  passwordResetExpires?: string;
  passwordResetToken?: string;
  cards: UserPaymentCard[];
  avatarUrl?: string;
}

export interface UserProfile extends Omit<User, 'passwordResetExpires' | 'passwordResetToken'> {}

export interface CardToken {
  _id: string;
  provider: GatewayProviders;
  token: string;
}

export interface UserCard {
  _id: string;
  brand: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  tokens: CardToken[];
  isActive: boolean;
  isDefault: boolean;
  createdAt: string;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  roleId: string;
  tenantId: string;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  roleId?: string;
}
