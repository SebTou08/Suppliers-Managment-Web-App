import {Component, EventEmitter, Output} from '@angular/core';
import {Supplier} from "../../core/models/Supplier";
import {CheckboxModule} from "primeng/checkbox";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {InputMaskModule} from "primeng/inputmask";
import {InputNumberModule} from "primeng/inputnumber";

@Component({
  selector: 'app-add-supplier',
  standalone: true,
  imports: [
    CheckboxModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    FormsModule,
    InputMaskModule,
    InputNumberModule
  ],
  templateUrl: './add-supplier.component.html',
  styleUrl: './add-supplier.component.css'
})
export class AddSupplierComponent {

  public newSupplier: Supplier  = {
    businessName: '',
    tradename: '',
    taxIdentification: '',
    phoneNumber: '',
    email: '',
    website: '',
    address: '',
    country: '',
    annualBilling: ''
  };

  @Output() registerSupplierEmitter = new EventEmitter<Supplier>();

  doRegisterSupplier () {
    console.log(this.newSupplier);
    this.registerSupplierEmitter.emit(this.newSupplier!);
  }
}
