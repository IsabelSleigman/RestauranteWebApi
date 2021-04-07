import { HomeComponent } from './home/home.component';
import { NaoEncontradaComponent } from './nao-encontrada/nao-encontrada.component';
import { NgModule, Component } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {
        path: "home/:comandaId",
        pathMatch: 'full',
        component: HomeComponent
    },
    {
        path: 'home/:comandaId',
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