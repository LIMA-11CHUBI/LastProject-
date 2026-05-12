export type Gender = 'MALE' | 'FEMALE';

export interface SignUpDto {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  address: string;
  phone: string;
  zipcode: string;
  avatar: string;
  gender: Gender;
}

export interface SignInDto {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  address: string;
  zipcode: string;
  avatar: string;
  phone: string;
  gender: Gender;
  verified: boolean;
  createdAt: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  age?: number;
  address?: string;
  phone?: string;
  zipcode?: string;
  avatar?: string;
  gender?: Gender;
}

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export interface VerifyEmailDto {
  email: string;
}

export interface RecoveryDto {
  email: string;
}
