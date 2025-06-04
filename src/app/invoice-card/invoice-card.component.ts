import { Component, Input } from '@angular/core';
import { Invoice } from '../../types/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-card',
  imports: [],
  templateUrl: './invoice-card.component.html',
  styleUrl: './invoice-card.component.scss'
})
export class InvoiceCardComponent {
@Input()
invoice!:Invoice

  constructor(private router: Router) {}

showDetails(id: string) {
  console.log('Card clicked:', id);
  this.router.navigate(['/invoice', this.invoice.id]);
}
}
