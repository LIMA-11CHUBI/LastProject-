export type QuoteType = 'Game' | 'Series' | 'Movie';

export interface Quote {
  _id: string;
  author: string;
  quote: string;
  type: QuoteType;
}

export interface QuotesResponse {
  total: number;
  limit: number;
  page: number;
  skip: number;
  quotes: Quote[];
}

export interface QuoteDto {
  author: string;
  quote: string;
  type: string;
}

export interface UpdateQuoteDto {
  author?: string;
  quote?: string;
  type?: string;
}
