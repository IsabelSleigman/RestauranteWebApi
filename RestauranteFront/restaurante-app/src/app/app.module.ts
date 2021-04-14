import { HomeService } from 'src/app/home/home.service';
import { DailogConfirmacaoComponent } from './dialogs/dailog-confirmacao/dailog-confirmacao.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import {InicialModule} from './inicial/inicial.module';
import { HomeModule } from './home/home.module';
import { NaoEncontradaComponent } from './nao-encontrada/nao-encontrada.component';
import { PedidoDialogComponent } from './dialogs/pedido-dialog/pedido-dialog.component';
import { EditarPedidoComponent } from './dialogs/editar-pedido/editar-pedido.component';
import { FecharComandaComponent } from './dialogs/fechar-comanda/fechar-comanda.component';
import { FaturamentoComponent } from './faturamento/faturamento.component';

@NgModule({
  declarations: [
    AppComponent,
    NaoEncontradaComponent,
    PedidoDialogComponent,
    EditarPedidoComponent,
    FecharComandaComponent,
    DailogConfirmacaoComponent,
    FaturamentoComponent
   
  ],
  imports: [
    BrowserModule,
    RouterModule,
    InicialModule,
    HttpClientModule,
    AppRoutingModule,
    HomeModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
