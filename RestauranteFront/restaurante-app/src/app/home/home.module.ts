import { SharedModule } from './../shared/shared.module';
import { PedidoService } from './pedido/pedido.service';
import { CardapioService } from './cardapio/cadapio.service';
import { HomeComponent } from './home.component';
import { NgModule, } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ComandaComponent } from './../home/comanda/comanda.component';
import { PedidoComponent } from './pedido/pedido.component';
import { CardapioComponent } from './cardapio/cardapio.component';
import { HomeService } from './home.service';
import { PedidoListComponent } from './pedido/pedido-list/pedido-list.component';

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
      },
  
    ]
  },

];

@NgModule({
  declarations: [
    HomeComponent,
    ComandaComponent,
    PedidoComponent,
    CardapioComponent,
    PedidoListComponent,
  
    
  ],
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule,
    SharedModule
    
  ],
  providers: [
    HomeService,PedidoService
  ]
})
export class HomeModule { }