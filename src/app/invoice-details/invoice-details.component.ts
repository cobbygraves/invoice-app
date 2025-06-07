import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../models/invoice';
import Invoices from '../../assets/data.json';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-invoice-details',
  imports: [RouterModule],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.scss',
})
export class InvoiceDetailsComponent implements OnInit {
  invoiceId: string = '';
  invoice!: Invoice;
  showDeleteModal = false;

  constructor(private location: Location, private route: ActivatedRoute) {}

  deleteInvoice(id: string) {
    // Your delete logic here
    const index = Invoices.findIndex((invoice) => invoice.id === id);
    if (index !== -1) {
      Invoices.splice(index, 1);
      this.goBack();
    }
    this.showDeleteModal = false;
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.invoiceId = this.route.snapshot.paramMap.get('id') || '';
    this.invoice = Invoices.find((invoice) => invoice.id === this.invoiceId)!;
  }
}
