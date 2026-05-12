import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent implements OnInit {
  isDropdownOpen = false;
  searchControl = new FormControl('');

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.authService.loadCurrentUser();
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onSearch(): void {
    const query = this.searchControl.value?.trim();
    if (query) {
      this.router.navigate(['/'], {
        queryParams: { keywords: query },
      });
      this.searchControl.reset();
    }
  }


logout(): void {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  this.authService.currentUser.set(null);
  this.isDropdownOpen = false;
  this.router.navigate(['/']);
}
}