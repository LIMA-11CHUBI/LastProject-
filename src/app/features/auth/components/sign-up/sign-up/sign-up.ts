import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../../core/services/auth';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUpComponent {
  form: FormGroup;
  isLoading = signal(false);
  errorMessage = signal('');
  isSuccess = signal(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      age: ['', [Validators.required, Validators.min(1)]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      zipcode: ['', [Validators.required]],
      avatar: ['', [Validators.required]],
      gender: ['MALE', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.signUp(this.form.value).subscribe({
      next: () => {
        this.isSuccess.set(true);
        this.isLoading.set(false);
        this.form.reset();
      },
      error: () => {
        this.errorMessage.set('რეგისტრაცია ვერ მოხერხდა!');
        this.isLoading.set(false);
      },
    });
  }
}
