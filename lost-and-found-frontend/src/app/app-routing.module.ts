import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LostItemsComponent } from './lost-items.component';
import { LostItemFormComponent } from './lost-item-form.component';

const routes: Routes = [
  { path: '', component: LostItemsComponent }, // Homepage
  { path: 'report-lost-item', component: LostItemFormComponent }, // Form page
  { path: '**', redirectTo: '' } // Wildcard fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

