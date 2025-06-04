import { Component } from '@angular/core';
import Invoices from '../../assets/data.json';
import { InvoiceCardComponent } from '../invoice-card/invoice-card.component';
import { ActionsComponent } from '../actions/actions.component';
import { NoInvoiceComponent } from '../no-invoice/no-invoice.component';
import moment from 'moment';
import { Invoice } from '../../types/types';

@Component({
  selector: 'app-home',
  imports: [
        ActionsComponent,
        NoInvoiceComponent,
        InvoiceCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  title = 'invoice';
  invoices: Invoice[] = Invoices.map((item) => ({
    ...item,
    paymentDue: moment(item.paymentDue).format('D MMM YYYY'),
  }));
}
