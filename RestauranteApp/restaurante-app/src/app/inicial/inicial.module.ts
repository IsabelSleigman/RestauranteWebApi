import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

import { InicialComponent } from './inicial.component';
import { HttpClientModule } from '@angular/common/http';
import { InicialFormComponent } from './inicial-form/inicial-form.component';

const routes: Routes = [
  {
    path: '',
    component: InicialComponent,
    children: [
      {
        path: '',
        component: InicialFormComponent,
        pathMatch:'full'
      
      }

    ]

  }

];

@NgModule({
  declarations: [
    InicialFormComponent,
    InicialComponent,

  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    MatListModule,
    MatCardModule,
    MatSelectModule
  ],
  providers: [

  ]
})
export class InicialModule { }