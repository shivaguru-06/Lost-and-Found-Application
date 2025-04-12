import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { ApiService } from './api.service';

@Component({
  selector: 'app-lost-item-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,          // ✅ Added MatCardModule for <mat-card>
    MatSnackBarModule
  ],
  templateUrl: './lost-item-form.component.html',
  styleUrls: ['./lost-item-form.component.css']
})
export class LostItemFormComponent implements OnInit {
  lostItemForm!: FormGroup;
  categories = ['Electronics', 'Clothing', 'Documents', 'Accessories', 'Others'];
  selectedImage: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.lostItemForm = this.fb.group({
      itemName: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      lastSeenLocation: [''],
      dateLost: ['', Validators.required],
      contactInfo: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
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
    if (this.lostItemForm.invalid || !this.selectedImage) {
      this.snackBar.open('Please fill all required fields and select an image', 'Close', { duration: 3000 });
      return;
    }

    const formData = new FormData();
    Object.entries(this.lostItemForm.value).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    formData.append('image', this.selectedImage);

    this.apiService.createLostItem(formData).subscribe({
      next: () => {
        this.snackBar.open('Item reported successfully!', 'Close', { duration: 3000 });
        this.router.navigate(['/lost-items']);
      },
      error: () => {
        this.snackBar.open('Something went wrong!', 'Close', { duration: 3000 });
      }
    });
  }
}
