import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { QrcodeService } from '../../../../core/services/qrcode';
import { QrCodeResponse } from '../../../../core/models/qrcode';
import { QrGeneratorComponent } from '../../components/qr-generator/qr-generator/qr-generator';
import { QrResultComponent } from '../../components/qr-result/qr-result/qr-result';

@Component({
  selector: 'app-qrcode',
  standalone: true,
  imports: [CommonModule, QrGeneratorComponent, QrResultComponent],
  templateUrl: './qrcode.html',
  styleUrl: './qrcode.css',
})
export class QrcodeComponent implements OnInit {
  defaultQr = signal<QrCodeResponse | null>(null);
  generatedQr = signal<QrCodeResponse | null>(null);
  isLoading = signal(false);

  constructor(private qrcodeService: QrcodeService) {}

  ngOnInit(): void {
    this.qrcodeService.getDefaultQrCode().subscribe({
      next: (qr) => this.defaultQr.set(qr),
    });
  }

  onGenerate(text: string): void {
    this.isLoading.set(true);
    this.qrcodeService.generateQrCode({ text }).subscribe({
      next: (qr) => {
        this.generatedQr.set(qr);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  onGenerateWithImage(data: { text: string; imageURL: string }): void {
    this.isLoading.set(true);
    this.qrcodeService.generateQrCodeWithImage(data).subscribe({
      next: (qr) => {
        this.generatedQr.set(qr);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }
}
