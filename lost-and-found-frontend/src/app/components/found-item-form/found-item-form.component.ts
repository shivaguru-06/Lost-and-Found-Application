import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-found-item-form',
  templateUrl: './found-item-form.component.html',
  styleUrls: ['./found-item-form.component.css']
})
export class FoundItemFormComponent {
  foundItemForm!: FormGroup;
  categories = ['Electronics', 'Clothing', 'Documents', 'Accessories', 'Others']; 
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  item: any;
  itemId: number = 0;
  isEditMode: boolean = false;
  maxDate: Date = new Date();

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    if(this.route.snapshot.params['id']){
      const baseUrl = 'http://localhost:3000';
      this.itemId = this.route.snapshot.params['id'];
      this.isEditMode = true;
      this.apiService.getFoundItemById(this.itemId).subscribe(data=>{
        this.item = data;
        this.item[0].imageUrl = this.item[0].imageUrl ? `${baseUrl}${this.item[0].imageUrl}` : null
        console.log(this.item[0]);
        this.foundItemForm.patchValue({
          item_name: this.item[0].item_name,
          category: this.item[0].category,
          description: this.item[0].description,
          found_location: this.item[0].found_location,
          date_found: this.item[0].date_found,
          contact_info: this.item[0].contact_info,
          phone_number: this.item[0].phone_number,
          address: this.item[0].address
        });
      });
      }
    this.foundItemForm = this.fb.group({
      item_name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      found_location: [''],
      date_found: [''],
      contact_info: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', Validators.required]
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  onSubmit(): void {
    if (this.foundItemForm.invalid || !this.selectedImage) {
      this.snackBar.open('Please fill all required fields and select an image', 'Close', { duration: 3000 });
      return;
    }

    const formData = new FormData();
    Object.entries(this.foundItemForm.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    formData.append('image', this.selectedImage);
    if(this.itemId != 0) {
      console.log('inside if');
      this.apiService.updateFoundItem(this.itemId,formData).subscribe({
        next: () => {
          this.snackBar.open('Item updated successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['/found-items']);
        },
        error: () => {
          this.snackBar.open('Something went wrong!', 'Close', { duration: 3000 });
        }
      });
    }
    else{
      console.log('inside else');
      this.apiService.createFoundItem(formData).subscribe({
        next: () => {
          this.snackBar.open('Item reported successfully!', 'Close', { duration: 3000 });
          this.router.navigate(['/found-items']);
        },
        error: () => {
          this.snackBar.open('Something went wrong!', 'Close', { duration: 3000 });
        }
      });
    }
  }

}
