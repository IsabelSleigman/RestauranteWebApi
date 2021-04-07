import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

import { InicialComponent } from './inicial.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    InicialComponent,

  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatListModule,
    MatCardModule,
    MatSelectModule
  ],
  exports:[InicialComponent],
  providers: [

  ]
})
export class InicialModule { }