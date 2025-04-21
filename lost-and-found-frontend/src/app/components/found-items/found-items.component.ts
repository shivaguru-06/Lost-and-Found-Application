import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FoundItem } from 'src/app/models/foundItem';
import { MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ItemDetailsComponent } from '../item-details/item-details.component';

@Component({
  selector: 'app-found-items',
  templateUrl: './found-items.component.html',
  styleUrls: ['./found-items.component.css']
})
export class FoundItemsComponent {
  //to search among found items
  // foundItemCount = 0;
  searchText = '';
  filterLocation = '';
  filterCategory = '';
  filterDate: string = '';
  searchTriggered: boolean = false; // 👈 Used to show results only after search
  searchItems: FoundItem[] = [];
  today: string = new Date().toISOString().split('T')[0];


  //for display of found items
  items: FoundItem[] = [];
  filteredItems: FoundItem[] = [];
  itemCount: number = 0;

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const baseUrl = 'http://localhost:3000'; // 👈 Change if your backend URL is different


    this.apiService.getFoundItems().subscribe({
      next: (data: FoundItem[]) => {
        // 🔁 Update imageUrl to include backend path
        this.items = data.map(item => ({
          ...item,
          imageUrl: item.imageUrl ? `${baseUrl}${item.imageUrl}` : null
        }));

        this.filteredItems = this.items;
        this.itemCount = this.items.length;
        console.log(this.items);

        if (this.items.length === 0) {
          this.snackBar.open('No found items reported.', 'Close', { duration: 3000 });
        }
      },
      error: (error) => {
        console.error('API Error:', error);
        this.snackBar.open('Failed to load found items. Check the console.', 'Close', { duration: 3000 });
      }
    });

    
    // console.log('Found items:', this.items, '\nCount:', this.foundItemCount);
  }

  loadItems(): void {
      const baseUrl = 'http://localhost:3000';
      console.log('Inside found items')
      this.apiService.getFoundItems().subscribe({
        next: (data: FoundItem[]) => {
          // 🔁 Update imageUrl to include backend path
          this.items = data.map(item => ({
            ...item,
            imageUrl: item.imageUrl ? `${baseUrl}${item.imageUrl}` : null
          }));
  
          this.filteredItems = this.items;
          this.itemCount = this.items.length;
  
          if (this.items.length === 0) {
            this.snackBar.open('No found items reported.', 'Close', { duration: 3000 });
          }
        },
        error: (error) => {
          console.error('API Error:', error);
          this.snackBar.open('Failed to load found items. Check the console.', 'Close', { duration: 3000 });
        }
      });
  
    }

  applyFilters(): void {
    this.searchTriggered = true; // 👈 Trigger result view
    this.searchItems = this.items.filter(item =>
      (this.searchText ? item.item_name?.toLowerCase().includes(this.searchText.toLowerCase()) : true) &&
      (this.filterLocation ? item.found_location?.toLowerCase().includes(this.filterLocation.toLowerCase()) : true) &&
      (this.filterCategory ? item.category === this.filterCategory : true) &&
      (this.filterDate ? new Date(item.date_found).toISOString().startsWith(this.filterDate) : true)
    );
    console.log(this.searchItems);
  }

  viewDetails(id: number | undefined): void {
    if (id !== undefined) {
      // this.router.navigate(['/found-items', id]);
      const dialogRef = this.dialog.open(ItemDetailsComponent, {
        width: '800px',
        data: { itemId: id, itemType: 'found' } // you can pass data for edit mode if needed
      });
    }
  }

  editItem(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate(['/update-found-items', id]);
    }
  }

  postLostItem(): void {
    this.router.navigate(['/found-items/new']);
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.apiService.deleteFoundItem(id).subscribe(() => {
        alert('🗑️ Item deleted successfully');
        this.loadItems(); // reload updated list
      });
    }
  }

}
