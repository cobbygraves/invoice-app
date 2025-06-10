import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import Invoices from '../../../public/data.json';

@Component({
  selector: 'app-actions',
  imports: [RouterModule],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.scss',
})
export class ActionsComponent implements OnInit {
  numberOfInvoices = 0;
  invoices = Invoices;

  ngOnInit(): void {
    this.numberOfInvoices = this.totalInvoices;
  }

  get totalInvoices(): number {
    return this.invoices.length;
  }

  @Output() desktopNew = new EventEmitter<void>();
  @Output() filterInvoices = new EventEmitter<Event>();

  onDesktopNewClick() {
    this.desktopNew.emit();
  }

  onFilterInvoices(event: Event) {
    this.filterInvoices.emit(event);
  }
}
