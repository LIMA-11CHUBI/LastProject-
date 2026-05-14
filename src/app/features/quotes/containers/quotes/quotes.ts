import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { QuoteService } from '../../../../core/services/quote';
import { Quote } from '../../../../core/models/quote';
import { QuoteListComponent } from '../../components/quote-list/quote-list/quote-list';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination/pagination';
import { AuthService } from '../../../../core/services/auth';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, QuoteListComponent, PaginationComponent],
  templateUrl: './quotes.html',
  styleUrl: './quotes.css',
})
export class QuotesComponent implements OnInit {
  quotes = signal<Quote[]>([]);
  randomQuote = signal<Quote | null>(null);
  quoteTypes = signal<string[]>([]);
  currentPage = signal(1);
  totalPages = signal(1);
  pageSize = 10;
  isLoading = signal(false);
  selectedType = signal('');
  showAddForm = signal(false);
  editingQuote = signal<Quote | null>(null);
  errorMessage = signal('');
  successMessage = signal('');

  form: FormGroup;

  constructor(
    private quoteService: QuoteService,
    private fb: FormBuilder,
    public authService: AuthService
  ) {
    this.form = this.fb.group({
      author: ['', Validators.required],
      quote: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadRandomQuote();
    this.loadQuoteTypes();
    this.loadQuotes();
  }

  loadQuotes(): void {
    this.isLoading.set(true);
    this.quoteService.getAllQuotes(
      this.currentPage(),
      this.pageSize,
      undefined,
      undefined,
      this.selectedType() || undefined
    ).subscribe({
      next: (res) => {
        this.quotes.set(res.quotes);
        this.totalPages.set(Math.ceil(res.total / this.pageSize));
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  loadRandomQuote(): void {
    this.quoteService.getRandomQuote().subscribe({
      next: (quote) => this.randomQuote.set(quote),
    });
  }

  loadQuoteTypes(): void {
    this.quoteService.getQuoteTypes().subscribe({
      next: (types) => this.quoteTypes.set(types),
    });
  }

  onTypeChange(type: string): void {
    this.selectedType.set(type);
    this.currentPage.set(1);
    this.loadQuotes();
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
    this.loadQuotes();
  }

  startEdit(quote: Quote): void {
    this.editingQuote.set(quote);
    this.showAddForm.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');
    this.form.patchValue({
      author: quote.author,
      quote: quote.quote,
      type: quote.type,
    });
  }

  cancelForm(): void {
    this.showAddForm.set(false);
    this.editingQuote.set(null);
    this.errorMessage.set('');
    this.successMessage.set('');
    this.form.reset();
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.errorMessage.set('');
    this.successMessage.set('');
    const editing = this.editingQuote();

    if (editing) {
      this.quoteService.updateQuote(editing._id, this.form.value).subscribe({
        next: () => {
          this.successMessage.set('✅ ციტატა წარმატებით განახლდა!');
          this.cancelForm();
          this.loadQuotes();
        },
        error: () => {
          this.errorMessage.set('განახლება ვერ მოხერხდა!');
        },
      });
    } else {
      this.quoteService.addQuote(this.form.value).subscribe({
        next: () => {
          this.successMessage.set('✅ ციტატა წარმატებით დაემატა!');
          this.cancelForm();
          this.loadQuotes();
        },
        error: (err) => {
          if (err.status === 409) {
            this.errorMessage.set('ეს ციტატა უკვე არსებობს!');
          } else {
            this.errorMessage.set('დამატება ვერ მოხერხდა!');
          }
        },
      });
    }
  }

  onDelete(id: string): void {
    this.quoteService.deleteQuote(id).subscribe({
      next: () => this.loadQuotes(),
      error: () => this.errorMessage.set('წაშლა ვერ მოხერხდა!'),
    });
  }
}
