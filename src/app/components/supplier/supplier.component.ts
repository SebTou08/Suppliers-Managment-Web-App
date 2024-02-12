import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {Supplier} from "../../core/models/Supplier";
import {SupplierService} from "../../core/services/supplier.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    InputNumberModule,
    InputTextModule,
    RippleModule,
    NgIf
  ],
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})
export class SupplierComponent {

  @Input() supplier: Supplier = {
    address: "",
    annualBilling: "",
    businessName: "",
    country: "",
    email: "",
    phoneNumber: "",
    taxIdentification: "",
    tradename: "",
    website: ""
  }

  @Input() isEditable: boolean = false;

  @Output() supplierEdited = new EventEmitter<Supplier>();

  constructor(private supplierService: SupplierService) {
  }

  editSupplier = () => {
    this.supplierService.updateSupplier(this.supplier).subscribe({
      next: (response) => {
        this.supplierEdited.emit(this.supplier);
      }
    })
  }

  openWebsite = (website: string) => {
    if(this.isEditable){
      console.log('222')
      window.open(website, "_blank")
    }
  }
}
