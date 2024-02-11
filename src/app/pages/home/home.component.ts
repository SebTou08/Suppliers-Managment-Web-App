import {Component, OnInit} from '@angular/core';
import {Supplier} from "../../core/models/Supplier";
import {SupplierService} from "../../core/services/supplier.service";
import {Router} from "@angular/router";
import {firstValueFrom} from "rxjs";
import {HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {
  AddSupplierComponent
} from "../../components/add-supplier/add-supplier.component";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {NgIf} from "@angular/common";
import {dateFormatted} from "../../utils/dateFormatter";
import {
  RiskSearcherComponent
} from "../../components/risk-searcher/risk-searcher.component";
import {SupplierComponent} from "../../components/supplier/supplier.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, TableModule, ButtonModule, DialogModule, AddSupplierComponent, ToastModule, NgIf, RiskSearcherComponent, SupplierComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers:[MessageService]
})
export class HomeComponent implements OnInit{

  public suppliers: Supplier[] = [];
  public dialogForNewSupplier: boolean = false;
  public isLoading: boolean = false;
  public dialogForRiskSearcher: boolean = false;
  public selectedSupplier: Supplier | undefined = undefined;
  public isEditable: boolean = false;
  public dialogForSupplier: boolean = false;
  constructor(private supplierService: SupplierService, private router: Router, private messageService: MessageService) {
  }


  async ngOnInit(): Promise<void> {
    await this.getAllSuppliers();
  }

  async getAllSuppliers(): Promise<void> {
    try {
      console.log('trying to get suppliers')
      this.suppliers = await firstValueFrom(this.supplierService.getAllSuppliers());
      console.log(this.suppliers);
    } catch (error) {
      console.error(error);
    }
  }

  async registerNewSupplier(supplier: Supplier): Promise<void> {
    console.log('data passed by child: ', supplier)
    try {
      this.isLoading = true;
     this.supplierService.registerSupplier(supplier).subscribe({
       next: async (response) => {
         console.log({response})
         this.messageService.add({
           severity: 'success',
           summary: 'Success',
           detail: response.statusText
         });
         this.dialogForNewSupplier = false;
         await this.getAllSuppliers();
         this.isLoading = false;

       },
       error: (error: HttpErrorResponse) => {
         console.log('error: ', error)
         this.isLoading = false;
         this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
       }
     })
    } catch (error) {
      console.error(error);
    }
  }

  editedSupplier = async () => {
    this.dialogForSupplier = false;
    await this.getAllSuppliers();
  }

  showDialogForNewSupplier = () => {
    this.dialogForNewSupplier = true;
  }

  showDialogForRiskSearcher = (supplier: Supplier) => {
    this.selectedSupplier = supplier;
    this.dialogForRiskSearcher = true;
  }
  showDialogForSeeSupplier = (supplier: Supplier) => {
    this.selectedSupplier = supplier;
    this.isEditable = false;
    this.dialogForSupplier = true;
  }

  showDialogForUpdateSupplier = (supplier: Supplier) => {
    this.selectedSupplier = supplier;
    this.isEditable = true;
    this.dialogForSupplier = true;
  }
  protected readonly dateFormatted = dateFormatted;
}
