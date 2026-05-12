import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  GenerateQrCodeDto,
  GenerateQrCodeWithImageDto,
  QrCodeResponse,
} from '../models/qrcode';

@Injectable({
  providedIn: 'root',
})
export class QrcodeService {
  private readonly API = 'https://api.everrest.educata.dev';

  constructor(private http: HttpClient) {}

  getDefaultQrCode(): Observable<QrCodeResponse> {
    return this.http.get<QrCodeResponse>(`${this.API}/qrcode`);
  }

  generateQrCode(dto: GenerateQrCodeDto): Observable<QrCodeResponse> {
    return this.http.post<QrCodeResponse>(`${this.API}/qrcode/generate`, dto);
  }

  generateQrCodeWithImage(dto: GenerateQrCodeWithImageDto): Observable<QrCodeResponse> {
    return this.http.post<QrCodeResponse>(`${this.API}/qrcode/generate_with_image`, dto);
  }
}
