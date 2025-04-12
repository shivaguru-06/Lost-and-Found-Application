import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from './api.service'; // Import ApiService
import { Item } from './item'; // Import your Item interface

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Lost & Found';
  lostItemCount = 0;

  searchText = '';
  filterLocation = '';
  filterCategory = '';
  filterDate: string = '';

  items: Item[] = [];
  filteredItems: Item[] = [];
  searchTriggered: boolean = false; // 👈 Used to show results only after search

  constructor(
    public router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loadLostItems();
  }

  loadLostItems(): void {
    this.apiService.getLostItems().subscribe({
      next: (data) => {
        this.items = data;
        this.filteredItems = []; // Empty initially to avoid showing before search
        this.lostItemCount = data.length;
      },
      error: (err) => {
        console.error('Failed to load items from backend:', err);
      }
    });
  }

  applyFilters(): void {
    this.searchTriggered = true; // 👈 Trigger result view
    this.filteredItems = this.items.filter(item =>
      (this.searchText ? item.itemName?.toLowerCase().includes(this.searchText.toLowerCase()) : true) &&
      (this.filterLocation ? item.lastSeenLocation?.toLowerCase().includes(this.filterLocation.toLowerCase()) : true) &&
      (this.filterCategory ? item.category === this.filterCategory : true) &&
      (this.filterDate ? new Date(item.dateLost).toISOString().startsWith(this.filterDate) : true)
    );
  }

  goToReportPage(): void {
    this.router.navigate(['/lost-items/new']);
  }
}
