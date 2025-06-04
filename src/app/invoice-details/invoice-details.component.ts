import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../../types/types';
import Invoices from '../../assets/data.json';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.scss',
})
export class InvoiceDetailsComponent implements OnInit {

 invoiceId: string = '';
 invoice!: Invoice;

  constructor(private location: Location, private route:ActivatedRoute) {}

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.invoiceId = this.route.snapshot.paramMap.get('id') || '';
    this.invoice = Invoices.find((invoice) => invoice.id === this.invoiceId)!;
  }
}
