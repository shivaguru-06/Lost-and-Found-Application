import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Item } from 'src/app/models/item';
import { MatSnackBar,MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { LostItemFormComponent } from '../lost-item-form/lost-item-form.component';
import { ItemDetailsComponent } from '../item-details/item-details.component';

@Component({
  selector: 'app-lost-items',
  templateUrl: './lost-items.component.html',
  styleUrls: ['./lost-items.component.css']
})
export class LostItemsComponent implements OnInit {
  //for search
  // search text for item name and as well as location
  searchText = '';
  filterLocation = '';
  filterCategory = '';
  filterDate: string = '';
  searchTriggered: boolean = false; 
  searchItems: Item[] = [];
  // maxDate: Date = new Date();
  today: string = new Date().toISOString().split('T')[0];


  //to display lost items
  items: Item[] = [];
  filteredItems: Item[] = [];
  itemCount: number = 0;

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
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

  loadItems(): void {
    const baseUrl = 'http://localhost:3000';
    console.log('Inside load items')
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

  applyFilters(): void {
    this.searchTriggered = true; // 👈 Trigger result view
    this.searchItems = this.items.filter(item =>
      ((this.searchText ? item.itemName?.toLowerCase().includes(this.searchText.toLowerCase()) : true) ||
      (this.searchText ? item.lastSeenLocation?.toLowerCase().includes(this.searchText.toLowerCase()) : true)) &&
      (this.filterCategory ? item.category === this.filterCategory : true) &&
      (this.filterDate ? new Date(item.dateLost).toISOString().startsWith(this.filterDate) : true)
    );
    console.log(this.searchItems);
  }

  viewDetails(id: number | undefined): void {
    if (id !== undefined) {
      // this.router.navigate(['/lost-items', id]);
      const dialogRef = this.dialog.open(ItemDetailsComponent, {
              width: '800px',
              data: { itemId: id,itemType: 'lost' } // you can pass data for edit mode if needed
            });
    }
  }

  editItem(id: number ): void {
    if (id !== undefined) {
      this.router.navigate(['/update-lost-items', id]);
      // this.openEditDialog(id);
    }
  }

  postLostItem(): void {
    this.router.navigate(['/lost-items/new']);
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.apiService.deleteItem(id).subscribe(() => {
        alert('🗑️ Item deleted successfully');
        this.loadItems(); // reload updated list
      });
    }
  }

  openLostItemForm(): void {
    const dialogRef = this.dialog.open(LostItemFormComponent, {
      width: '800px',
      
    });
  
    
  
    dialogRef.afterClosed().subscribe(result => {
      // Reload list if needed
      this.loadItems();
    });
  }

  openEditDialog(id: number): void {
    const dialogRef = this.dialog.open(LostItemFormComponent, {
      width: '800px',
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Reload list if needed
      this.loadItems();
    });
  }

}
