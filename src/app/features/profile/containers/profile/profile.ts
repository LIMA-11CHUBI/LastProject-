import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';
import { ProfileInfoComponent } from '../../components/profile-info/profile-info/profile-info';
import { ChangePasswordComponent } from '../../components/change-password/change-password/change-password';
import { FavoritesComponent } from '../../components/favorites/favorites/favorites';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ProfileInfoComponent, ChangePasswordComponent, FavoritesComponent],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class ProfileComponent implements OnInit {
  activeTab = signal<'info' | 'password' | 'favorites'>('info');
  showDeleteConfirm = signal(false);

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.loadCurrentUser();
  }

  deleteAccount(): void {
    this.authService.deleteUser().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
    });
  }
}