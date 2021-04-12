import { SharedModule } from './../shared/shared.module';
import { PedidoService } from './pedido/pedido.service';
import { HomeComponent } from './home.component';
import { NgModule, } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ComandaComponent } from './../home/comanda/comanda.component';
import { PedidoComponent } from './pedido/pedido.component';
import { CardapioComponent } from './cardapio/cardapio.component';
import { HomeService } from './home.service';

const routes: Routes = [

  {
    path: ':comandaId',
    component: HomeComponent,
    children: [
     
      {
        path: 'comanda',
        component: ComandaComponent,
      },
      {
        path: '',
        component: CardapioComponent,
      },
      {
        path: 'pedidos',
        component: PedidoComponent,
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