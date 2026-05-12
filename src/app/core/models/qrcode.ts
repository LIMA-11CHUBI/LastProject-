export interface GenerateQrCodeDto {
  text: string;
}

export interface GenerateQrCodeWithImageDto {
  text: string;
  imageURL: string;
}

export interface QrCodeResponse {
  text: string;
  type: string;
  format: string;
  errorCorrectionLevel: string;
  imageURL?: string;
  result: string;
}
