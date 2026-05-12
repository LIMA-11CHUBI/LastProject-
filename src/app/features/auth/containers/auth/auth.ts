import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from '../../components/sign-in/sign-in/sign-in';
import { SignUpComponent } from '../../components/sign-up/sign-up/sign-up';
import { RecoveryComponent } from '../../components/recovery/recovery/recovery';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, SignInComponent, SignUpComponent, RecoveryComponent],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class AuthComponent {
  activeTab = signal<'signIn' | 'signUp' | 'recovery'>('signIn');
}
