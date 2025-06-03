import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ActionsComponent } from './actions/actions.component';
import { NoInvoiceComponent } from './no-invoice/no-invoice.component';
import Invoices from '../assets/data.json';
import { InvoiceCardComponent } from './invoice-card/invoice-card.component';
import moment from 'moment';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    ActionsComponent,
    NoInvoiceComponent,
    InvoiceCardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'invoice';
  invoices = Invoices.map((item) => ({
    ...item,
    paymentDue: moment(item.paymentDue).format('D MMM YYYY'),
  }));
}
