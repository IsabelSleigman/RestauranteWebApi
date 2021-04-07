import { InicialComponent } from './inicial/inicial.component';
import { IniciadaModel } from './home/comanda/models/iniciada-model';
import { HomeComponent } from './home/home.component';
import { NaoEncontradaComponent } from './nao-encontrada/nao-encontrada.component';
import { NgModule, Component } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: InicialComponent
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
    },
    {
        path: '404',
        component: NaoEncontradaComponent
    },
    {
        path: '**',
        redirectTo: '404'
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }