import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminFeaturesComponent } from './admin-features.component';
import { HomeComponent } from './home/home.component';
import { InventoryManagementComponent } from './inventory-management/inventory-management.component';

const routes: Routes = [
  {
    path: '',
    //  redirectTo:'inventory',
    component: AdminFeaturesComponent,
    children: [
      { path: 'inventory', component: InventoryManagementComponent },
      {
        path: 'home',
        component: HomeComponent
      },
    ]
    // { path: 'userDetails', component: UserDetailsComponent }

  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminFeaturesRoutingModule { }
