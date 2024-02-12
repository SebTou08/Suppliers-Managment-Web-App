import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse
} from "@angular/common/http";
import {Supplier} from "../models/Supplier";
import {Observable, retry} from "rxjs";
import {RiskFinder, RiskFinderResponse} from "../models/RiskFinder";
import {environment} from "../../../enviroments/enviroment";

@Injectable({
  providedIn: 'root'
})
export class RiskSearcherService {

  private basePath: string  = environment.riskSearcherAPI;

  constructor(private http: HttpClient) { }
  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  searchByTaxIdetification(taxIdentification: string): Observable<HttpResponse<RiskFinder> | HttpErrorResponse>{
    return this.http.post<RiskFinder>(this.basePath +'sanctions', JSON.stringify({name: taxIdentification}), {...this.httpOptions, observe:'response'})
      .pipe(
        retry(2)
      )
  }

  searchByAddres(address: string): Observable<HttpResponse<RiskFinderResponse> | HttpErrorResponse>{
    return this.http.post<RiskFinderResponse>(this.basePath +'sanctions', JSON.stringify({address: address}), {...this.httpOptions, observe:'response'})
      .pipe(
        retry(2)
      )
  }

  searchBussineesName(bussinessName: string): Observable<HttpResponse<RiskFinderResponse> | HttpErrorResponse>{
    return this.http.post<RiskFinderResponse>(this.basePath + 'sanctions', JSON.stringify({name: bussinessName}), {...this.httpOptions, observe:'response'})
      .pipe(
        retry(2)
      )
  }

  searchInWorldBank(bussinessName: string): Observable<HttpResponse<RiskFinderResponse> | HttpErrorResponse>{
    return this.http.post<RiskFinderResponse>(this.basePath+ 'world-bank', JSON.stringify({name: bussinessName}), {...this.httpOptions, observe:'response'})
      .pipe(
        retry(2)
      )
  }


}
