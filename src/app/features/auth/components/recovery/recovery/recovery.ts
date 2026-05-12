import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../../core/services/auth';

@Component({
  selector: 'app-recovery',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recovery.html',
  styleUrl: './recovery.css',
})
export class RecoveryComponent {
  form: FormGroup;
  isLoading = signal(false);
  isSuccess = signal(false);
  errorMessage = signal('');

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.authService.recovery(this.form.value).subscribe({
      next: () => {
        this.isSuccess.set(true);
        this.isLoading.set(false);
        this.form.reset();
      },
      error: () => {
        this.errorMessage.set('პაროლის აღდგენა ვერ მოხერხდა!');
        this.isLoading.set(false);
      },
    });
  }
}
