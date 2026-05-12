import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import {
  SignUpDto,
  SignInDto,
  User,
  AuthResponse,
  UpdateUserDto,
  ChangePasswordDto,
  VerifyEmailDto,
  RecoveryDto,
} from '../models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API = 'https://api.everrest.educata.dev';
  currentUser = signal<User | null>(null);

  constructor(private http: HttpClient) {}

  signUp(dto: SignUpDto): Observable<User> {
    return this.http.post<User>(`${this.API}/auth/sign_up`, dto);
  }

  signIn(dto: SignInDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API}/auth/sign_in`, dto).pipe(
      tap((res) => {
        localStorage.setItem('access_token', res.access_token);
        localStorage.setItem('refresh_token', res.refresh_token);
        this.loadCurrentUser();
      })
    );
  }

  loadCurrentUser(): void {
    this.getCurrentUser().subscribe({
      next: (user) => this.currentUser.set(user),
      error: () => this.currentUser.set(null),
    });
  }

  signOut(): Observable<void> {
    return this.http.post<void>(`${this.API}/auth/sign_out`, {}).pipe(
      tap(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.currentUser.set(null);
      })
    );
  }

  refreshToken(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API}/auth/refresh`, {});
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.API}/auth`);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.API}/auth/id/${id}`);
  }

  updateUser(dto: UpdateUserDto): Observable<User> {
    return this.http.patch<User>(`${this.API}/auth/update`, dto).pipe(
      tap((user) => this.currentUser.set(user))
    );
  }

  changePassword(dto: ChangePasswordDto): Observable<void> {
    return this.http.patch<void>(`${this.API}/auth/change_password`, dto);
  }

  verifyEmail(dto: VerifyEmailDto): Observable<void> {
    return this.http.post<void>(`${this.API}/auth/verify_email`, dto);
  }

  recovery(dto: RecoveryDto): Observable<void> {
    return this.http.post<void>(`${this.API}/auth/recovery`, dto);
  }

  deleteUser(): Observable<void> {
    return this.http.delete<void>(`${this.API}/auth/delete`).pipe(
      tap(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        this.currentUser.set(null);
      })
    );
  }
}