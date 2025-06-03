import { Component, Input } from '@angular/core';
import { Invoice } from '../../types/types';

@Component({
  selector: 'app-invoice-card',
  imports: [],
  templateUrl: './invoice-card.component.html',
  styleUrl: './invoice-card.component.scss'
})
export class InvoiceCardComponent {
@Input()
invoice!:Invoice
}
