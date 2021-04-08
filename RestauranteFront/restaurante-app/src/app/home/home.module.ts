import { PedidoService } from './pedido/pedido.service';
import { CardapioService } from './cardapio/cadapio.service';
import { MatListModule } from '@angular/material/list';
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
import { PedidoComponent } from './pedido/pedido.component';
import { CardapioComponent } from './cardapio/cardapio.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatGridListModule} from '@angular/material/grid-list';
import { PedidoListComponent } from './pedido/pedido-list/pedido-list.component';
import { HomeService } from './home.service';

const routes: Routes = [

  {
    path: ':comandaId',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: PedidoComponent,
      },
      {
        path: 'comanda',
        component: ComandaComponent,
      },
      {
        path: 'cardapio',
        component: CardapioComponent,
      },
      {
        path: 'pedidos',
        component: PedidoListComponent,
      }
    ]
  },

];

@NgModule({
  declarations: [
    HomeComponent,
    ComandaComponent,
    HeaderComponent,
    FooterComponent,
    PedidoComponent,
    CardapioComponent,
    PedidoListComponent,
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
    MatCardModule,
    FlexLayoutModule,
    MatListModule,
    MatGridListModule
  ],
  providers: [
    HomeService,CardapioService,PedidoService
  ]
})
export class HomeModule { }