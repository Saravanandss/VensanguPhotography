import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { AboutComponent } from './about/about.component';
import { ConfigureComponent } from './configure/configure.component';

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
    path: 'outdoor',
    component: PortfolioComponent,
    data: {type: 'outdoor'}
  },
  {
    path:'about',
    component: AboutComponent
  },
  {
    path:'configure',
    component: ConfigureComponent
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
export class AppRoutingModule { }
