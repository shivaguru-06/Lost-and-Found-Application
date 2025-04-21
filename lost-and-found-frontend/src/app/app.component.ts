import { Component,OnInit } from '@angular/core';
import { Item } from './models/item';
import { Router, RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'lost-and-found-frontend';

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
    console.log(this.router.url);
    this.loadLostItems();
  }

  showSidebar: boolean = false;

  isSidebarVisible(): boolean {
    console.log(this.router.url);
    return !this.router.url.includes('landing');
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
    console.log(this.filteredItems);
  }

  goToReportPage(): void {
    this.router.navigate(['/lost-items/new']);
  }

}
