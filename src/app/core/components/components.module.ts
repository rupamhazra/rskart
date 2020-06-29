import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccordianComponent } from './accordian/accordian.component'
// import {
//   MatFormFieldModule,
//   MatInputModule,
//   MatOptionModule,
//   MatSelectModule,
//   MatIconModule,
//   MatPaginatorModule,
//   MatSortModule,
//   MatExpansionModule,
//   MatBadgeModule,
//   MatDatepickerModule,
//   MatNativeDateModule,
//   MatProgressSpinnerModule,
//   MatButtonToggleModule,
//   MatTabsModule
// } from "@angular/material";

//import { ScrollDispatchModule } from '@angular/cdk/scrolling';


@NgModule({
  declarations: [HeaderComponent, AccordianComponent],
  imports: [
    CommonModule,
    IonicModule,
    FontAwesomeModule,
  ],
  exports: [
    HeaderComponent,
    AccordianComponent,
    FontAwesomeModule,
    // MatFormFieldModule,
    // MatInputModule,
    // MatIconModule,
    // MatOptionModule,
    // MatSelectModule,
    // MatPaginatorModule,
    // MatSortModule,
    // MatExpansionModule,
    // MatBadgeModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // MatProgressSpinnerModule,
    // MatButtonToggleModule,
    // MatTabsModule,
    // ScrollDispatchModule
  ]
})
export class ComponentsModule { }
