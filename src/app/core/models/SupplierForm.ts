import {FormControl} from "@angular/forms";
import {Country} from "./Country";

export interface SupplierForm {
  businessName: FormControl<string>;
  tradename: FormControl<string>;
  taxIdentification: FormControl<string>;
  phoneNumber: FormControl<string>;
  email: FormControl<string>;
  website: FormControl<string>;
  address: FormControl<string>;
  country: FormControl<Country>;
  annualBilling: FormControl<string>;
}
