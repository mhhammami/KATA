import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCategory } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private readonly http: HttpClient) { }

  public getCategories(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>('/assets/data/categories.json');
  }
}
