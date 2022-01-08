import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminFeaturesRoutingModule } from './admin-features-routing.module';
import { InventoryManagementComponent } from './inventory-management/inventory-management.component';
import { AdminFeaturesComponent } from './admin-features.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [InventoryManagementComponent,AdminFeaturesComponent],
  imports: [
    CommonModule,
    AdminFeaturesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminFeaturesModule { }
