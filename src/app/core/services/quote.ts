import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Quote,
  QuotesResponse,
  QuoteDto,
  UpdateQuoteDto,
} from '../models/quote';

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  private readonly API = 'https://api.everrest.educata.dev';

  constructor(private http: HttpClient) {}

  getAllQuotes(pageIndex = 1, pageSize = 5, author?: string, keywords?: string, type?: string): Observable<QuotesResponse> {
    let params = new HttpParams()
      .set('page_index', pageIndex)
      .set('page_size', pageSize);
    if (author) params = params.set('author', author);
    if (keywords) params = params.set('keywords', keywords);
    if (type) params = params.set('type', type);
    return this.http.get<QuotesResponse>(`${this.API}/quote`, { params });
  }

  getRandomQuote(): Observable<Quote> {
    return this.http.get<Quote>(`${this.API}/quote/random`);
  }

  getQuoteTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${this.API}/quote/types`);
  }

  addQuote(dto: QuoteDto): Observable<Quote> {
    return this.http.post<Quote>(`${this.API}/quote`, dto);
  }

  updateQuote(id: string, dto: UpdateQuoteDto): Observable<Quote> {
    return this.http.patch<Quote>(`${this.API}/quote/id/${id}`, dto);
  }

  deleteQuote(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API}/quote/id/${id}`);
  }
}
