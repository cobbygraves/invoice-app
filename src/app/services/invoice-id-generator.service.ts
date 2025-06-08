import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InvoiceIdGeneratorService {
  constructor() {}

  generateRandomNumber(): number {
    return Math.floor(Math.random() * 10000) + 1;
  }

  generateRandomLetter(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return chars[Math.floor(Math.random() * chars.length)];
  }

  getRandomInvoiceId(): string {
    const letters = this.generateRandomLetter() + this.generateRandomLetter();
    const number = this.generateRandomNumber();
    return letters + number;
  }
}
