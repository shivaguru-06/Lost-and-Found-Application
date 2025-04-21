import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LostItemFormComponent } from './components/lost-item-form/lost-item-form.component';
import { LostItemsComponent } from './components/lost-items/lost-items.component';
import { FoundItemsComponent } from './components/found-items/found-items.component';
import { FoundItemFormComponent } from './components/found-item-form/found-item-form.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { EditLostItemComponent } from './components/edit-lost-item/edit-lost-item.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent }, // Redirect to landing page
  { path: 'dashboard', component: DashboardComponent },
  { path: 'lost-items', component: LostItemsComponent }, // Homepage
  { path: 'lost-items/new', component: LostItemFormComponent }, // Form page
  { path: 'found-items', component: FoundItemsComponent },
  { path: 'found-items/new', component: FoundItemFormComponent },
  { path: 'lost-items/:id', component: ItemDetailsComponent },
  { path: 'found-items/:id', component: ItemDetailsComponent },
  { path: 'update-lost-items/:id', component: LostItemFormComponent },
  { path: 'update-found-items/:id', component: FoundItemFormComponent },
  // { path: 'landing-page', component: LandingPageComponent },
  
  
  // { path: '**', redirectTo: '' } // Wildcard fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
