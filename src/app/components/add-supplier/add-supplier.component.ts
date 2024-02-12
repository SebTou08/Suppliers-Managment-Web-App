import {Component, EventEmitter, inject, Output} from '@angular/core';
import {Supplier} from "../../core/models/Supplier";
import {CheckboxModule} from "primeng/checkbox";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {InputMaskModule} from "primeng/inputmask";
import {InputNumberModule} from "primeng/inputnumber";
import {SupplierForm} from "../../core/models/SupplierForm";
import {Country} from "../../core/models/Country";
import {MultiSelectModule} from "primeng/multiselect";
import {NgForOf, NgIf} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";

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
    InputNumberModule,
    ReactiveFormsModule,
    MultiSelectModule,
    NgForOf,
    NgIf,
    DropdownModule
  ],
  templateUrl: './add-supplier.component.html',
  styleUrl: './add-supplier.component.css'
})

export class AddSupplierComponent {

  countries!: Country[];
  protected formBuilder = inject(FormBuilder);

  form: FormGroup<SupplierForm> = this.formBuilder.group({
    businessName: this.formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    tradename: this.formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    taxIdentification: this.formBuilder.control('', {
      validators: [Validators.required, Validators.minLength(11), Validators.maxLength(11)],
      nonNullable: true
    }),
    phoneNumber: this.formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true
    }),
    website: this.formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    address: this.formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    country: this.formBuilder.control({name: '', code: ''}, {
      validators: [Validators.required],
      nonNullable: true
    }),
    annualBilling: this.formBuilder.control('', {
      validators: [Validators.required],
      nonNullable: true
    })
  })


  @Output() registerSupplierEmitter = new EventEmitter<Supplier>();

  constructor() {
    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Peru', code: 'PE' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' }
    ];
  }

  doRegisterSupplier () {
    const supplier: Supplier = {
      taxIdentification: this.form.value.taxIdentification!,
      email: this.form.value.email!,
      website: this.form.value.website!,
      phoneNumber: this.form.value.phoneNumber!,
      tradename: this.form.value.tradename!,
      businessName: this.form.value.businessName!,
      address: this.form.value.address!,
      country: this.form.value.country?.name!,
      annualBilling: this.form.value.annualBilling!
    }
    this.registerSupplierEmitter.emit(supplier);
  }
}
