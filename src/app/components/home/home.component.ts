import { Component, Inject } from '@angular/core';
import Invoices from '../../../../public/data.json';
import { InvoiceCardComponent } from '../invoice-card/invoice-card.component';
import { ActionsComponent } from '../../actions/actions.component';
import { NoInvoiceComponent } from '../no-invoice/no-invoice.component';
import moment from 'moment';
import { Invoice } from '../../models/invoice';
import { CommonModule } from '@angular/common';
import { InvoiceIdGeneratorService } from '../../services/invoice-id-generator.service';
import { InvoiceManagementService } from '../../services/invoice-management.service';

import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    ActionsComponent,
    NoInvoiceComponent,
    InvoiceCardComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private formBuilder: FormBuilder,
    private invoiceId: InvoiceIdGeneratorService,
    private invoiceService: InvoiceManagementService
  ) {}

  title = 'invoice';
  showNewInvoiceModal = false;
  editForm!: FormGroup;

  invoices: Invoice[] = [];

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
    this.invoiceService.readInvoice().subscribe((invoices: Invoice[]) => {
      this.invoices = invoices;
    });
  }

  handleDesktopNew() {
    this.showNewInvoiceModal = true;
  }

  handleInvoiceFilter(event: Event) {
    const target = event.target as HTMLInputElement;
    const filterValue = target.value.toLowerCase();
    this.invoices = Invoices.filter(
      (invoice: Invoice) => invoice.status === filterValue
    ).map((item: Invoice) => ({
      ...item,
      paymentDue: moment(item.paymentDue).format('D MMM YYYY'),
    }));
  }

  closeNewInvoiceModal() {
    this.showNewInvoiceModal = false;
    this.editForm.reset();
    this.listItems.clear();
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
    this.invoiceService.addInvoice(editedData);
    this.closeNewInvoiceModal();
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

    this.invoiceService.addInvoice(editedData);
    this.closeNewInvoiceModal();
    console.log(editedData);
  }
}
