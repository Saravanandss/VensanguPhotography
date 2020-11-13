import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { AboutComponent } from './about/about.component';
import { ImageService } from './services/image.service';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    
    AppRoutingModule,
    HttpClientModule,
    AppModule,
    BrowserTransferStateModule    
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})

export class AppBrowserModule { }
