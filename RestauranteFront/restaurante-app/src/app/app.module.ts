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
import { RetomarComandaComponent } from './dialogs/retomar-comanda/retomar-comanda.component';

@NgModule({
  declarations: [
    AppComponent,
    NaoEncontradaComponent,
    PedidoDialogComponent,
    RetomarComandaComponent,
   
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
