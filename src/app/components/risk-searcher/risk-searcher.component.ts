import {Component, Input, OnInit} from '@angular/core';
import {dateFormatted} from "../../utils/dateFormatter";
import {AddSupplierComponent} from "../add-supplier/add-supplier.component";
import {DialogModule} from "primeng/dialog";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {Supplier} from "../../core/models/Supplier";
import {RiskFinder} from "../../core/models/RiskFinder";
import {MultiSelectModule} from "primeng/multiselect";
import {RiskDatabases} from "../../core/models/Databases";
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {RiskSearcherService} from "../../core/services/risk-searcher.service";
import {HttpResponse} from "@angular/common/http";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-risk-searcher',
  standalone: true,
  imports: [
    AddSupplierComponent,
    DialogModule,
    SharedModule,
    TableModule,
    MultiSelectModule,
    ButtonModule,
    FormsModule,
    NgIf,
    InputTextModule
  ],
  templateUrl: './risk-searcher.component.html',
  styleUrl: './risk-searcher.component.css'
})
export class RiskSearcherComponent implements OnInit{
  @Input() supplier : Supplier = {
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

  public risksFounds: Array<RiskFinder> = [];
  public supplierWithRisks: boolean = false;
  public databases: Array<RiskDatabases> = [];
  public selectedDatabases: Array<RiskDatabases> = [];
  public isLoading: boolean = false;


  constructor(private riskService: RiskSearcherService) {
  }

  ngOnInit() {
    this.databases = [
      {name: 'Offshore Leaks Database', code: 'OLD'},
      {name: 'The World Bank', code: 'TWB'},
      {name: 'OFAC', code: 'OFAC:'}
    ]
  }

  searchForRisks =() => {
    this.isLoading = true;
    this.riskService.searchBussineesName(this.supplier.businessName).subscribe({
      next: (response) => {
        if (response instanceof HttpResponse) {
          console.log({response})
          this.supplierWithRisks = true;
          this.risksFounds = this.risksFounds.concat(response.body!);
          this.isLoading = false;
        }
      }
    });
    this.riskService.searchByAddres(this.supplier.address).subscribe({
      next:(response) => {
        if (response instanceof HttpResponse) {
          console.log({response})
          this.supplierWithRisks = true;
          this.risksFounds = this.risksFounds.concat(response.body!);
          this.isLoading = false;
        }
      }
    })
  }
}
