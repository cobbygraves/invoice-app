import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InvoiceDetailsComponent } from './components/invoice-details/invoice-details.component';
import { EditInvoiceComponent } from './components/edit-invoice/edit-invoice.component';
import { NewInvoiceComponent } from './components/new-invoice/new-invoice.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'invoices/new',
    component: NewInvoiceComponent,
  },
  {
    path: 'invoices/:id',
    component: InvoiceDetailsComponent,
  },
  {
    path: 'invoices/:id/edit',
    component: EditInvoiceComponent,
  },
];
