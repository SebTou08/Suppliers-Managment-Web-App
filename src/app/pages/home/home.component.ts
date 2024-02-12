import {Component, OnInit, ViewChild} from '@angular/core';
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
import {ConfirmationService, MessageService} from "primeng/api";
import {NgIf} from "@angular/common";
import {dateFormatted} from "../../utils/dateFormatter";
import {
  RiskSearcherComponent
} from "../../components/risk-searcher/risk-searcher.component";
import {SupplierComponent} from "../../components/supplier/supplier.component";
import {ToolbarComponent} from "../../components/toolbar/toolbar.component";
import {ConfirmDialogModule} from "primeng/confirmdialog";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule, TableModule, ButtonModule, DialogModule, AddSupplierComponent, ToastModule, NgIf, RiskSearcherComponent, SupplierComponent, ToolbarComponent, ConfirmDialogModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers:[MessageService, ConfirmationService]
})
export class HomeComponent implements OnInit{

  public suppliers: Supplier[] = [];
  public dialogForNewSupplier: boolean = false;
  public isLoading: boolean = false;
  public dialogForRiskSearcher: boolean = false;
  public selectedSupplier: Supplier | undefined = undefined;
  public isEditable: boolean = false;
  public dialogForSupplier: boolean = false;
  protected readonly dateFormatted = dateFormatted;

  @ViewChild(RiskSearcherComponent) private riskSearchComponentInstance: RiskSearcherComponent | undefined;
  @ViewChild(AddSupplierComponent) private addSupplierComponentInstance: AddSupplierComponent | undefined;
  constructor(private confirmationService: ConfirmationService, private supplierService: SupplierService, private router: Router, private messageService: MessageService) {
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
    this.addSupplierComponentInstance?.form.reset();
  }

  editedSupplier = async () => {
    this.dialogForSupplier = false;
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Supplier edited!'
    });
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

  onRiskSearchDialogHide = () => {
    this.riskSearchComponentInstance?.resetValues();
  }


  confirm2(event: Event, supplier: Supplier) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this supplier?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
        this.deleteSupplier(supplier.taxIdentification);
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }

  async deleteSupplier(taxIdentification: string){
    this.supplierService.deleteSupplier(taxIdentification).subscribe({
      next: async (response) => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Supplier deleted' });
        await this.getAllSuppliers();
      },
      error: async (error) => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: error.toString() });
        await this.getAllSuppliers();
      }
    })
  }

}
