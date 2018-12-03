import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ModelerComponent } from './modeler.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ModelerComponent
  ],
  exports: [
    ModelerComponent
  ]
})
export class ModelerModule {}
