import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrCodeResponse } from '../../../../../core/models/qrcode';

@Component({
  selector: 'app-qr-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './qr-result.html',
  styleUrl: './qr-result.css',
})
export class QrResultComponent {
  @Input() qr!: QrCodeResponse;
}