import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { customerModel } from './customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomer(){
    return this.http.get<customerModel[]>(environment.apiURL+'/customers');
  }
  addCustomer(customerData:customerModel){
    return this.http.post(environment.apiURL+'/customers',customerData);
  }
  deleteCustomer(id:string){
    return this.http.delete(`${environment.apiURL}/customers/${id}`);
  }
  editCustomer(id:string,userData:{[key: string]: string}){
    console.log(userData);
    return this.http.patch(`${environment.apiURL}/customers/${id}`,userData);
  }

  getSelectedCustomer(id:string){
    return this.http.get<customerModel>(`${environment.apiURL}/customers/${id}`);
  }

}
