import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InvoiceDetailsComponent } from './invoice-details/invoice-details.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'invoice/:id',
    component: InvoiceDetailsComponent,
  },
  {
    path: 'invoice/:id/edit',
    component: EditInvoiceComponent,
  },
  {
    path: 'new-invoice',
    component: NewInvoiceComponent,
  },
];
