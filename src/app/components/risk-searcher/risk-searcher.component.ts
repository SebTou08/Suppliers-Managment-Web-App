import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {dateFormatted} from "../../utils/dateFormatter";
import {AddSupplierComponent} from "../add-supplier/add-supplier.component";
import {DialogModule} from "primeng/dialog";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {Supplier} from "../../core/models/Supplier";
import {RiskFinder, RiskFinderResponse} from "../../core/models/RiskFinder";
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
export class RiskSearcherComponent implements OnInit, OnDestroy{
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

  public risksFounds: RiskFinderResponse = {hits: "", results: []};
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
      {name: 'OFAC', code: 'OFAC'}
    ]
  }



  searchForRisks =() => {

    this.isLoading = true;
    console.log(this.selectedDatabases);
    const isOfacSelected = this.selectedDatabases.filter(e => e.code == 'OFAC').length > 0;
    const isWorldBankSelected = this.selectedDatabases.filter(e => e.code == 'TWB').length > 0;

    if(isOfacSelected){
      console.log('ofac selected')
      this.riskService.searchBussineesName(this.supplier.businessName).subscribe({
        next: (response) => {
          if (response instanceof HttpResponse) {
            console.log({response})
            this.supplierWithRisks = true;
            this.risksFounds.results = this.risksFounds.results.concat(response.body?.results!);
            if (!isWorldBankSelected){
              this.isLoading = false;
            }
          }
        }
      });
    }
    if(isWorldBankSelected) {
      console.log('im into worldbank')
      this.riskService.searchInWorldBank(this.supplier.businessName).subscribe({
        next:(response) => {
          if (response instanceof HttpResponse) {
            console.log({response})
            this.supplierWithRisks = true;
            this.risksFounds.results = this.risksFounds.results.concat(response.body?.results!);
            this.isLoading = false;
          }
        }
      })
    }

  }

  resetValues = () => {
    this.risksFounds = {hits: "", results: []}
    this.supplierWithRisks = false;
    this.selectedDatabases = []
  }

  ngOnDestroy(): void {
    this.risksFounds = {hits: "", results: []}
  }
}
