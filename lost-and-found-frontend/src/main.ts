import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { LostItemsComponent } from './app/lost-items.component';
import { LostItemFormComponent } from './app/lost-item-form.component';

const routes = [
  { path: '', component: LostItemsComponent },
  { path: 'report', component: LostItemFormComponent },
  { path: '**', redirectTo: '' } // optional: wildcard route
];

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(routes)
  ]
});




