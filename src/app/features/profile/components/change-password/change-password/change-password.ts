import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../../core/services/auth';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePasswordComponent {
  form: FormGroup;
  isLoading = signal(false);
  isSuccess = signal(false);
  errorMessage = signal('');

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      oldPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.isLoading.set(true);
    this.isSuccess.set(false);
    this.errorMessage.set('');

    this.authService.changePassword(this.form.value).subscribe({
      next: () => {
        this.isSuccess.set(true);
        this.isLoading.set(false);
        this.form.reset();
      },
      error: () => {
        this.errorMessage.set('პაროლის შეცვლა ვერ მოხერხდა!');
        this.isLoading.set(false);
      },
    });
  }
}
