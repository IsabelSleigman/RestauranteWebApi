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
import { PedidoComponent } from './pedido/pedido.component';
import { PedidoListComponent } from './pedido/pedido-list/pedido-list.component';
import { CardapioComponent } from './cardapio/cardapio.component';
import { ProdutoComponent } from './cardapio/produto/produto.component';
import { FlexLayoutModule } from '@angular/flex-layout';




const routes: Routes = [

  {
    path: ':comandaId',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: PedidoComponent,
        pathMatch: 'full'
      },
      {
        path: 'comanda',
        component: ComandaComponent,
        pathMatch: 'full'
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
    FooterComponent,
    PedidoComponent,
    PedidoListComponent,
    CardapioComponent,
    ProdutoComponent
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
    FlexLayoutModule
  ],
  providers: [

  ]
})
export class HomeModule { }