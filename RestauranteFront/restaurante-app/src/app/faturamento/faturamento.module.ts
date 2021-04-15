import { FaturamentoComponent } from './faturamento.component';
import { NgModule, } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './../shared/shared.module';
import { AtendimentosEmAbertoComponent } from './atendimentos-em-aberto/atendimentos-em-aberto.component';



const routes: Routes = [

    {
        path: '',
        component: FaturamentoComponent,
        children: [
     
            {
              path: 'abertas',
              component: AtendimentosEmAbertoComponent,
            },
           
           
        
          ]
        }
];




@NgModule({
    declarations: [
  


    
    AtendimentosEmAbertoComponent
  ],
    imports: [
        RouterModule.forChild(routes),
        HttpClientModule,
        SharedModule

    ],
    
    providers: [

    ]
})
export class FaturamentoModule { }