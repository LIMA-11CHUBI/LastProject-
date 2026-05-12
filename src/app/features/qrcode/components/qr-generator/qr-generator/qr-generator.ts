import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-qr-generator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './qr-generator.html',
  styleUrl: './qr-generator.css',
})
export class QrGeneratorComponent {
  @Input() isLoading = false;
  @Output() generate = new EventEmitter<string>();
  @Output() generateWithImage = new EventEmitter<{ text: string; imageURL: string }>();

  activeTab = signal<'text' | 'image'>('text');

  textForm: FormGroup;
  imageForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.textForm = this.fb.group({
      text: ['', [Validators.required]],
    });

    this.imageForm = this.fb.group({
      text: ['', [Validators.required]],
      imageURL: ['', [Validators.required]],
    });
  }

  onGenerateText(): void {
    if (this.textForm.invalid) return;
    this.generate.emit(this.textForm.value.text);
  }

  onGenerateWithImage(): void {
    if (this.imageForm.invalid) return;
    this.generateWithImage.emit(this.imageForm.value);
  }
}
