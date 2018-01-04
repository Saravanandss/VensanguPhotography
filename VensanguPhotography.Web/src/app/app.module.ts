import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'
import { PortfolioComponent } from './portfolio.component';
import { PortfolioService } from './portfolio.service';
import { AboutComponent } from './about.component';

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    AboutComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [PortfolioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
