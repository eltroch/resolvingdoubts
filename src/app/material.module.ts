import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



// Angular Material

import { MatDialogModule } from '@angular/material/dialog';

import {MatCardModule} from '@angular/material/card';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDividerModule} from '@angular/material/divider';

import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  imports: [
    CommonModule, 
    MatDialogModule,
    MatDividerModule,
    MatCardModule,
    
    MatListModule,
    MatSnackBarModule
  ],
  providers: [],
  exports: [
    MatDialogModule,
   
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatDividerModule,

    MatSnackBarModule
  ],
  declarations: []
})
export class MaterialModule { }
