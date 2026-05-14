import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../../core/services/auth';
import { User } from '../../../../../core/models/auth';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-info.html',
  styleUrl: './profile-info.css',
})
export class ProfileInfoComponent {
  @Input() set user(value: User | null) {
    if (value) {
      this.form.patchValue({
        firstName: value.firstName,
        lastName: value.lastName,
        age: value.age,
        address: value.address,
        phone: value.phone,
        zipcode: value.zipcode,
        avatar: value.avatar,
        gender: value.gender,
      });
    }
  }

  form: FormGroup;
  isLoading = signal(false);
  isSuccess = signal(false);
  errorMessage = signal('');

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.form = this.fb.group({
      firstName: [''],
      lastName: [''],
      age: [''],
      address: [''],
      phone: [''],
      zipcode: [''],
      avatar: [''],
      gender: [''],
    });
  }

  onSubmit(): void {
    this.isLoading.set(true);
    this.isSuccess.set(false);
    this.errorMessage.set('');

    this.authService.updateUser(this.form.value).subscribe({
      next: () => {
        this.isSuccess.set(true);
        this.isLoading.set(false);
        this.authService.loadCurrentUser();
      },
      error: () => {
        this.errorMessage.set('განახლება ვერ მოხერხდა!');
        this.isLoading.set(false);
      },
    });
  }
}
