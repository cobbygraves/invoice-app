import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../models/invoice';
import InvoicesData from '../../assets/data.json';
const Invoices: Invoice[] = InvoicesData as Invoice[];
import moment from 'moment';

import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceIdGeneratorService } from '../services/invoice-id-generator.service';

@Component({
  selector: 'app-new-invoice',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-invoice.component.html',
  styleUrl: './new-invoice.component.scss',
})
export class NewInvoiceComponent {
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private invoiceId: InvoiceIdGeneratorService
  ) {}

  editForm!: FormGroup;

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      streetAddress: [''],
      createdAt: [''],
      city: [''],
      postCode: [''],
      country: [''],
      clientName: [''],
      clientEmail: [''],
      clientStreetAddress: [''],
      paymentDue: [''],
      clientCity: [''],
      clientPostCode: [''],
      clientCountry: [''],
      invoiceDate: [''],
      paymentTerms: ['net-7-days'],
      invoiceDescription: [''],
      listItems: this.formBuilder.array([]),
    });
  }

  get listItems(): FormArray {
    return this.editForm.get('listItems') as FormArray;
  }

  newItem(): FormGroup {
    return this.formBuilder.group({
      name: [''],
      quantity: [''],
      price: [''],
      total: [''],
    });
  }

  addItem() {
    this.listItems.push(this.newItem());
  }

  removeItem(index: number) {
    this.listItems.removeAt(index);
  }

  onSubmit() {
    const editedData = {
      id: this.invoiceId.getRandomInvoiceId(),
      createdAt: moment().format('D MMM YYYY'),
      paymentDue: moment(new Date()).add(7, 'days').format('D MMM YYYY'),
      description: this?.editForm?.value?.invoiceDescription,
      paymentTerms: this?.editForm?.value?.paymentTerms,
      clientName: this?.editForm?.value?.clientName,
      clientEmail: this?.editForm?.value?.clientEmail,
      status: 'pending',
      senderAddress: {
        street: this.editForm?.value?.streetAddress,
        city: this?.editForm?.value?.city,
        postCode: this?.editForm?.value?.postCode,
        country: this?.editForm?.value?.country,
      },
      clientAddress: {
        street: this.editForm?.value?.clientStreetAddress,
        city: this?.editForm?.value?.clientCity,
        postCode: this?.editForm?.value?.clientPostCode,
        country: this?.editForm?.value?.clientCountry,
      },
      items: this?.editForm?.value?.listItems,
      total: this?.editForm?.value?.listItems.reduce(
        (
          acc: number,
          curr: { name: string; quantity: number; price: number; total: number }
        ) => acc + curr?.price,
        0
      ),
    };

    // console.log(editedData);

    // Add as new invoice
    Invoices.push(editedData);

    this.router.navigate(['/']);
  }

  onDraft() {
    const editedData = {
      id: this.invoiceId.getRandomInvoiceId(),
      createdAt: moment().format('D MMM YYYY'),
      paymentDue: moment(new Date()).add(7, 'days').format('D MMM YYYY'),
      description: this?.editForm?.value?.invoiceDescription,
      paymentTerms: this?.editForm?.value?.paymentTerms,
      clientName: this?.editForm?.value?.clientName,
      clientEmail: this?.editForm?.value?.clientEmail,
      status: 'draft',
      senderAddress: {
        street: this.editForm?.value?.streetAddress,
        city: this?.editForm?.value?.city,
        postCode: this?.editForm?.value?.postCode,
        country: this?.editForm?.value?.country,
      },
      clientAddress: {
        street: this.editForm?.value?.clientStreetAddress,
        city: this?.editForm?.value?.clientCity,
        postCode: this?.editForm?.value?.clientPostCode,
        country: this?.editForm?.value?.clientCountry,
      },
      items: this?.editForm?.value?.listItems,
      total: this?.editForm?.value?.listItems.reduce(
        (
          acc: number,
          curr: { name: string; quantity: number; price: number; total: number }
        ) => acc + curr?.price,
        0
      ),
    };

    // console.log(editedData);

    // Add as new invoice
    Invoices.push(editedData);

    this.router.navigate(['/']);
  }
}
