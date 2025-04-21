import { Component, OnInit } from '@angular/core';
import { FoundItem } from 'src/app/models/foundItem';
import { Item } from 'src/app/models/item';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  lostCount = 0;
  foundCount = 0;
  recentLost: Item[] = [];
  recentFound: FoundItem[] = [];

  constructor(
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.fetchDashboardData();
  }
  fetchDashboardData(): void {
    // this.apiService.getLostItems().subscribe(lostItems => {
    //   this.lostCount = lostItems.length;
    //   this.recentLost = lostItems.slice(-5);
    //   console.log('Recent Lost Items:', this.recentLost);
    // });

    this.apiService.getLostItems().subscribe({
      next: (data: Item[]) => {
        // 🔁 Update imageUrl to include backend path
        this.recentLost = data.map(item => ({
          ...item,
        }));
        this.lostCount = this.recentLost.length;
      },
      error: (error) => {
        console.error('API Error:', error);
      }
    });

    // this.apiService.getFoundItems().subscribe(foundItems => {
    //   this.foundCount = foundItems.length;
    //   this.recentFound = foundItems.slice(-5).reverse(); // Last 5 found
    // });

    this.apiService.getFoundItems().subscribe({
      next: (data: FoundItem[]) => {
        // 🔁 Update imageUrl to include backend path
        this.recentFound = data.map(item => ({
          ...item,
        }));
        this.foundCount = this.recentFound.length;
      },
      error: (error) => {
        console.error('API Error:', error);
      }
    });

  }
}
