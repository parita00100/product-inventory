import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'admin/home' },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin-features/admin-features.module').then(
        (m) => m.AdminFeaturesModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
