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
        component: PortfolioComponent,
        data: {type: 'portfolio'}
    },
    {
        path: 'portrait',
        component: PortfolioComponent,
        data: {type: 'portrait'}
    },
    {
        path: 'family',
        component: PortfolioComponent,
        data: {type: 'family'}
    },
    {
        path: 'party',
        component: PortfolioComponent,
        data: {type: 'party'}
    },
    {
        path: '**',
        redirectTo: '/portfolio'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}