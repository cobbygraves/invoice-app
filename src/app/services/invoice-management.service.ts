import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice';
import invoiceData from '../../assets/data.json';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class InvoiceManagementService {
  constructor() {}

  addInvoice(invoice: Invoice): void {
    invoiceData.push(invoice);
  }

  deleteInvoice(id: string): void {
    const index = invoiceData.findIndex(
      (invoice: Invoice) => invoice.id === id
    );
    if (index !== -1) {
      invoiceData.splice(index, 1);
    }
  }

  updateInvoice(invoice: Invoice): void {
    const index = invoiceData.findIndex(
      (inv: Invoice) => inv?.id === invoice.id
    );

    if (index !== -1) {
      // Update existing invoice
      invoiceData[index] = invoice;
    }
  }

  readInvoice(): Invoice[] {
    return invoiceData.map((item: Invoice) => ({
      ...item,
      paymentDue: moment(item.paymentDue).format('D MMM YYYY'),
    }));
  }
}
