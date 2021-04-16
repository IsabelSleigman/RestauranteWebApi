import { LoginComponent } from './faturamento/login/login.component';
import { InicialComponent } from './inicial/inicial.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: InicialComponent
    },
     {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    {
        path: 'faturamento',
        loadChildren: () => import('./faturamento/faturamento.module').then(m => m.FaturamentoModule)
       
    }
   
];


@NgModule({
    imports: [RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }