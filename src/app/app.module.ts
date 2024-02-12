import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyCalculatorComponent } from './my-calculator/my-calculator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { CommonModule } from '@angular/common';

// import { DecimalPipe } from "@angular/common";


@NgModule({
  declarations: [],
  imports: [
    AppComponent,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MyCalculatorComponent,
    CommonModule 
  ],
  providers: [DecimalPipe],
  bootstrap: [],
  
})
export class AppModule { }



