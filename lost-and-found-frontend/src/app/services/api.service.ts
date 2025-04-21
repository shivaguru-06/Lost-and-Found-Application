import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item';
import { FoundItem } from '../models/foundItem';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // 🔹 GET: Fetch all lost items
  getLostItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/lost-items`);
  }

  // 🔹 POST: Submit new lost item with image using FormData
  createLostItem(formData: FormData): Observable<any> {
    console.log('Form Data:', formData.get('itemName'));
    return this.http.post(`${this.apiUrl}/lost-items`, formData);
  }
  

  // 🔹 (Optional) GET by ID (if detail page required)
  getItemById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/lost-items/${id}`);
  }

  //Update lost item by id
  updateLostItem(id: number, formData: FormData): Observable<any> {
    console.log('Form Data:', formData.get('itemName'), id);
    return this.http.put(`${this.apiUrl}/lost-items/${id}`,formData);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/lost-items/${id}`);
  }
  
  // 🔹 GET: Fetch all found items
  getFoundItems(): Observable<FoundItem[]> {
    return this.http.get<FoundItem[]>(`${this.apiUrl}/found-items`);
  }

  getFoundItemById(id: number): Observable<FoundItem> {
    return this.http.get<FoundItem>(`${this.apiUrl}/found-items/${id}`);
  }

  createFoundItem(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/found-items`, formData);
  }

  updateFoundItem(id: number, formData: FormData): Observable<any>{
    return this.http.put(`${this.apiUrl}/found-items/${id}`,formData);
  }

  deleteFoundItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/found-items/${id}`);
  }
}
