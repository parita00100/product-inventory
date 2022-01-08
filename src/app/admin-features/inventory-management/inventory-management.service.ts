import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class InventoryManagementService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<any>('assets/product.json')
    .toPromise()
    .then(res => <Product[]>res.data)
    .then(data => { return data; });
}
}
