import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../models/invoice';
import InvoicesData from '../../assets/data.json';
const Invoices: Invoice[] = InvoicesData as Invoice[];
import { RouterModule, Router } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-invoice-details',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.scss',
})
export class InvoiceDetailsComponent implements OnInit {
  invoiceId: string = '';
  invoice!: Invoice;
  showDeleteModal = false;
  showEditModal = false;
  editForm!: FormGroup;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  deleteInvoice(id: string) {
    // Your delete logic here
    const index = Invoices.findIndex((invoice) => invoice.id === id);
    if (index !== -1) {
      Invoices.splice(index, 1);
      this.goBack();
    }
    this.showDeleteModal = false;
  }

  handleShowEdit() {
    this.showEditModal = !this.showEditModal;
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.invoiceId = this.route.snapshot.paramMap.get('id') || '';
    this.invoice = Invoices.find((invoice) => invoice.id === this.invoiceId)!;
    this.editForm = this.formBuilder.group({
      streetAddress: [this.invoice?.senderAddress?.street],
      city: [this.invoice?.senderAddress?.city],
      postCode: [this.invoice?.senderAddress?.postCode],
      country: [this.invoice?.senderAddress?.country],
      clientName: [this.invoice?.clientName],
      clientEmail: [this.invoice?.clientEmail],
      clientStreetAddress: [this.invoice?.clientAddress?.street],
      clientCity: [this.invoice?.clientAddress?.city],
      clientPostCode: [this.invoice?.clientAddress?.postCode],
      clientCountry: [this.invoice?.clientAddress?.country],
      invoiceDate: [this.invoice?.createdAt],
      paymentTerms: ['net-7-days'],
      invoiceDescription: [this.invoice?.description],
      listItems: this.formBuilder.array(
        this.invoice.items.map((item) =>
          this.formBuilder.group({
            name: [item.name],
            quantity: [item.quantity],
            price: [item.price],
            total: [item.total],
          })
        )
      ),
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
      id: this?.invoiceId,
      createdAt: this?.invoice?.createdAt,
      paymentDue: this?.invoice?.paymentDue,
      description: this?.editForm?.value?.invoiceDescription,
      paymentTerms: this?.editForm?.value?.paymentTerms,
      clientName: this?.editForm?.value?.clientName,
      clientEmail: this?.editForm?.value?.clientEmail,
      status: this.invoice?.status,
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
    // console.log(editedDAta);
    // Find the index of the invoice to update
    const index = Invoices.findIndex(
      (inv: Invoice) => inv?.id === editedData.id
    );

    if (index !== -1) {
      // Update existing invoice
      Invoices[index] = editedData;
    } else {
      // Add as edited invoice
      Invoices.push(editedData);
    }
    this.router.navigate(['/']);
    console.log(Invoices);
  }
}
