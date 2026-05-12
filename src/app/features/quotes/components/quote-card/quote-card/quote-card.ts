import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Quote } from '../../../../../core/models/quote';

@Component({
  selector: 'app-quote-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quote-card.html',
  styleUrl: './quote-card.css',
})
export class QuoteCardComponent {
  @Input() quote!: Quote;
  @Input() isLoggedIn = false;
  @Output() edit = new EventEmitter<Quote>();
  @Output() delete = new EventEmitter<string>();
}
