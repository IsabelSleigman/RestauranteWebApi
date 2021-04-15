import { FaturamentoComponent } from './faturamento.component';
import { NgModule, } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './../shared/shared.module';
import { AtendimentosEmAbertoComponent } from './atendimentos-em-aberto/atendimentos-em-aberto.component';
import { AtendimentosFechadosComponent } from './atendimentos-fechados/atendimentos-fechados.component';
import { ComandaDialogComponent } from './dialogs/comanda-dialog/comanda-dialog.component';
import {MatExpansionModule} from '@angular/material/expansion';


const routes: Routes = [

    {
        path: '',
        component: FaturamentoComponent,
        children: [
     
            {
              path: 'abertas',
              component: AtendimentosEmAbertoComponent,
            },
            {
              path: 'fechados',
              component: AtendimentosFechadosComponent,
            },
           
           
        
          ]
        }
];




@NgModule({
    declarations: [
  


    
    AtendimentosEmAbertoComponent,
                  AtendimentosFechadosComponent,
                  ComandaDialogComponent
  ],
    imports: [
        RouterModule.forChild(routes),
        HttpClientModule,
        MatExpansionModule,
        SharedModule

    ],
    
    providers: [

    ]
})
export class FaturamentoModule { }