import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice';
import { HttpClient } from '@angular/common/http';
import invoiceData from '../../../public/data.json'; // Adjust the path as necessary
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class InvoiceManagementService {
  private dataUrl = 'data.json';

  constructor(private http: HttpClient) {}

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

  readInvoice(): Observable<Invoice[]> {
    // return invoiceData.map((item: Invoice) => ({
    //   ...item,
    //   paymentDue: moment(item.paymentDue).format('D MMM YYYY'),
    // }));
    return this.http.get<Invoice[]>(this.dataUrl).pipe(
      map((invoices) =>
        invoices.map((invoice) => ({
          ...invoice,
          paymentDue: moment(invoice.paymentDue).format('D MMM YYYY'),
        }))
      )
    );
  }
}
