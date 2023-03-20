import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Customer } from 'src/app/models/Customer';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-customer-card',
  templateUrl: './customer-card.component.html',
  styleUrls: ['./customer-card.component.css'],
})
export class CustomerCardComponent {
  @Input() customer?: Customer;
  @Output() delete = new EventEmitter<Customer>();
  faEnvelope = faEnvelope;
  faMapMarker = faMapMarkerAlt;
  faPhone = faPhone;
  faTrashAlt = faTrash;

  OnDelete() {
    this.delete.emit(this.customer);
  }
}
