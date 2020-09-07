import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { AboutComponent } from './about/about.component';
import { PortfolioService } from './services/portfolio.service';
import { CommonModule } from '@angular/common';
import { RenderComponent } from './render/render.component';


@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    AboutComponent,
    RenderComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule,
    CommonModule  
  ],
  providers: [PortfolioService],
  bootstrap: [AppComponent]
})

export class AppModule { }
