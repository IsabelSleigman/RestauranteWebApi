import { SharedModule } from './../shared/shared.module';
import { PedidoService } from './pedido/pedido.service';
import { HomeComponent } from './home.component';
import { NgModule, } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ComandaComponent } from './../home/comanda/comanda.component';
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
     
  
    ]
  },

];

@NgModule({
  declarations: [
    HomeComponent,
    ComandaComponent,
    CardapioComponent,
  
    
  ],
  imports: [
    RouterModule.forChild(routes),
    HttpClientModule,
    SharedModule
    
  ],
  providers: [
    PedidoService
  ]
})
export class HomeModule { }