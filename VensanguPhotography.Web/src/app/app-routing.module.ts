import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './portfolio.component';

const routes: Routes = [
    {
        path:'',
        redirectTo: '/portfolio',
        pathMatch: 'full'
    },
    {
        path: 'portfolio',
        component: PortfolioComponent
    },
    {
        path: 'portrait',
        component: PortfolioComponent
    },
    {
        path: 'family',
        component: PortfolioComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}