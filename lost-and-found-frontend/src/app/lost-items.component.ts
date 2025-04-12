import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { ApiService } from './api.service';
import { Item } from './item'; 

@Component({
  selector: 'app-lost-items',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './lost-items.component.html',
  styleUrls: ['./lost-items.component.css']
})
export class LostItemsComponent implements OnInit {
  items: Item[] = [];
  filteredItems: Item[] = [];
  itemCount: number = 0;

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    const baseUrl = 'http://localhost:3000'; // 👈 Change if your backend URL is different

    this.apiService.getLostItems().subscribe({
      next: (data: Item[]) => {
        // 🔁 Update imageUrl to include backend path
        this.items = data.map(item => ({
          ...item,
          imageUrl: item.imageUrl ? `${baseUrl}${item.imageUrl}` : null
        }));

        this.filteredItems = this.items;
        this.itemCount = this.items.length;

        if (this.items.length === 0) {
          this.snackBar.open('No lost items found.', 'Close', { duration: 3000 });
        }
      },
      error: (error) => {
        console.error('API Error:', error);
        this.snackBar.open('Failed to load lost items. Check the console.', 'Close', { duration: 3000 });
      }
    });
  }

  viewDetails(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/lost-items', id]);
    }
  }

  postLostItem(): void {
    this.router.navigate(['/lost-items/new']);
  }
}







