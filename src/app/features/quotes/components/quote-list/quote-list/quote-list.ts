import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Quote } from '../../../../../core/models/quote';
import { QuoteCardComponent } from '../../quote-card/quote-card/quote-card';

@Component({
  selector: 'app-quote-list',
  standalone: true,
  imports: [CommonModule, QuoteCardComponent],
  templateUrl: './quote-list.html',
  styleUrl: './quote-list.css',
})
export class QuoteListComponent {
  @Input() quotes: Quote[] = [];
  @Input() isLoggedIn = false;
  @Output() edit = new EventEmitter<Quote>();
  @Output() delete = new EventEmitter<string>();
}