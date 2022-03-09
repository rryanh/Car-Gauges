import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { GaugeComponent } from './components/gauge/gauge.component';
import { InfoTextComponent } from './components/info-text/info-text.component';
import { GaugeClusterComponent } from './components/gauge-cluster/gauge-cluster.component';
import { TextComponent } from './components/text/text.component';
import { TextGaugeComponent } from './components/text-gauge/text-gauge.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GaugeComponent,
    InfoTextComponent,
    GaugeClusterComponent,
    TextComponent,
    TextGaugeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
