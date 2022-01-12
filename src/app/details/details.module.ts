import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component';
import { NgChartsModule } from 'ng2-charts';
import { NgModule } from '@angular/core';
import { RatingModule } from 'ng-starrating';

const routes: Routes = [
  { path: '', component: DetailsComponent }
]

@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RatingModule,
    NgChartsModule
  ]
})
export class DetailsModule { }
