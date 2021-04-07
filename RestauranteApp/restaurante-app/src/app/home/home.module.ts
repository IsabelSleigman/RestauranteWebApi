import { HeaderComponent } from './../shared/header/header.component';
import { HomeComponent } from './home.component';
import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from '../shared/footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { ComandaComponent } from './../home/comanda/comanda.component';
import { ComandaIniciadaComponent } from './comanda-iniciada/comanda-iniciada.component';




const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch:'full'},
    {
      path: 'home',
      component: HomeComponent,
    children: [
      {
        path: ':comandaId',
        component: ComandaIniciadaComponent, 
      },
      {
        path: 'comanda',
        component: ComandaComponent, 
      }
    ]
  },
    
];

@NgModule({
  declarations: [
    HomeComponent,
    ComandaComponent,
    ComandaIniciadaComponent,
    HeaderComponent,
    FooterComponent
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
    MatToolbarModule,
    MatCardModule
  ],
  providers: [

  ]
})
export class HomeModule { }