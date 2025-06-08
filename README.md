# Invoice Management App

## Project Description

This project is an Invoice Management application built with Angular. It allows users to view, create, edit, and delete invoices, as well as filter them by status. The app features a responsive design, dark/light theme toggle, and modular component structure for maintainability.

---

## Setup & Run Instructions

1. **Clone the repository:**

   git clone https://github.com/cobbygraves/invoice-app
   cd invoice

2. **Install dependencies:**

   npm install

3. **Run the development server:**

   npm start

   The app will be available at `http://localhost:4200`.

---

## Application Features

- View a list of all invoices
- Filter invoices by status (Paid, Pending, Draft)
- Create new invoices using a modal form
- Edit and delete existing invoices
- Responsive layout for desktop and mobile
- Light and dark theme toggle
- Form validation and user feedback

---

## Component Structure

- **AppComponent**: Root component, includes header, sidebar, and main content area.
- **HeaderComponent**: Displays the app header and theme toggle.
- **SidebarComponent**: Navigation sidebar.
- **ActionsComponent**: Invoice actions (filter, add new).
- **InvoiceListComponent**: Displays the list of invoices.
- **InvoiceDetailsComponent**: Shows details for a single invoice.
- **EditInvoiceComponent**: Modal form for creating/editing invoices.

---

## Routing Overview

- `/` — Home page, shows invoice list
- `/invoices/new` — Create a new invoice
- `/invoice/:id` — View details for a specific invoice
- `/invoice/:id/edit` — Edit a specific invoice

## Form Implementation

- Reactive Forms are used for invoice creation and editing.
- Form validation ensures required fields are filled and data is correctly formatted.
- Dynamic form arrays are used for invoice items.
- Modal dialogs are used for form presentation and confirmation actions.
