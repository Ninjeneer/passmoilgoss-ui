import { RouterModule, Routes } from '@angular/router';

import { CatalogComponent } from './catalog.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrphanCardComponent } from './orphan-card/orphan-card.component';
import { RatingModule } from 'ng-starrating';

const routes: Routes = [
  { path: '', component: CatalogComponent }
]

@NgModule({
  declarations: [
    CatalogComponent,
    OrphanCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RatingModule
  ]
})
export class CatalogModule { }
