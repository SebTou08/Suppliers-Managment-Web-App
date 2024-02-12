import {Injectable} from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse
} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Supplier} from "../models/Supplier";
import {environment} from "../../../enviroments/enviroment";

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private basePath: string = environment.supplierAPI;
  constructor(private http: HttpClient) { }

  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }


  getAllSuppliers(): Observable<Supplier[]>{
    console.log('in function supplier')
    const a = this.http.get<Supplier[]>(this.basePath)
      .pipe(retry(2), catchError(this.handleError));
    console.log({a});
    return a;
  }

  registerSupplier(supplier: Supplier): Observable<HttpResponse<Supplier> | HttpErrorResponse> {
    return this.http.post<Supplier>(this.basePath, JSON.stringify(supplier), {...this.httpOptions, observe:'response'})
      .pipe(
        retry(2)
      );
  }

  updateSupplier(supplier: Supplier): Observable<HttpResponse<Supplier>| HttpErrorResponse>{
    return this.http.put<Supplier>(this.basePath + '/' + supplier.taxIdentification, JSON.stringify(supplier), {...this.httpOptions, observe: 'response'})
      .pipe(
        retry(2)
      )
  }

  deleteSupplier(taxIdentification: string){
    return this.http.delete(this.basePath + '/'+ taxIdentification, {...this.httpOptions, observe:'response'})
      .pipe(
        retry(2)
      )
  }
}
