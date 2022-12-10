import { UserRole } from './userRole';
export interface IUser {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: UserRole;
}
