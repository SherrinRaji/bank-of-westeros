import { NgModule } from '@angular/core';
import { routes } from './routes';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
