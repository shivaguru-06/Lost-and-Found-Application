import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item';

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
    return this.http.post(`${this.apiUrl}/lost-items`, formData);
  }
  

  // 🔹 (Optional) GET by ID (if detail page required)
  getItemById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/lost-items/${id}`);
  }
}

