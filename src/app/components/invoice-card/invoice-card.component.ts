import { Component, Input } from '@angular/core';
import { Invoice } from '../../models/invoice';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-invoice-card',
  imports: [CurrencyPipe],
  templateUrl: './invoice-card.component.html',
  styleUrl: './invoice-card.component.scss',
})
export class InvoiceCardComponent {
  @Input()
  invoice!: Invoice;

  constructor(private router: Router) {}

  showDetails(id: string) {
    this.router.navigate(['/invoices', id]);
  }
}
