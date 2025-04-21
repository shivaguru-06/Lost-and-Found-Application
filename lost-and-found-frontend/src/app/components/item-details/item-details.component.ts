import { Component,OnInit,Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent {
  item: any;
  itemId: number = 0;
  routePath: string | undefined;
  isLostItem: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ItemDetailsComponent>,
  ){}


  ngOnInit(): void {
    if (this.data?.itemId) {
      this.itemId = this.data.itemId;
      console.log(this.itemId);
    }
    if (this.data?.itemType){
      this.isLostItem = this.data.itemType === 'lost' ? true : false;
      console.log(this.isLostItem);
    }
    // this.itemId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.itemId);
    this.routePath = this.route.routeConfig?.path;
    // this.isLostItem = this.routePath?.includes('lost') ? true : false;
    const baseUrl = 'http://localhost:3000';
    if(this.isLostItem){
      
      this.apiService.getItemById(this.itemId).subscribe(data=>{
        this.item = data;
        this.item[0].dateLost = new Date(this.item[0].dateLost).toISOString().slice(0, 10);
        this.item[0].imageUrl = this.item[0].imageUrl ? `${baseUrl}${this.item[0].imageUrl}` : null
        console.log(this.item[0]);
      });
      console.log(this.item[0].imageUrl);
    }
    else{
      this.apiService.getFoundItemById(this.itemId).subscribe(data=>{
        this.item = data;
        this.item[0].date_found = new Date(this.item[0].date_found).toISOString().slice(0, 10); 
        this.item[0].imageUrl = this.item[0].imageUrl ? `${baseUrl}${this.item[0].imageUrl}` : null
        console.log(this.item[0]);
      });
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
