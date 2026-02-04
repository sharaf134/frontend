
export enum AccountType {
  TRAINEE = 'متدرب',
  VOLUNTEER = 'متطوع'
}

export type AuthView = 'login' | 'signup';

export interface UserData {
  fullName?: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  accountType?: AccountType;
  rememberMe?: boolean;
}
