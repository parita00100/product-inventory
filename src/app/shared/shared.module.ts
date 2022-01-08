import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';

// Prime ng module import
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ToolbarModule} from 'primeng/toolbar';
import {CardModule} from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
const PRIMENG_COMPONENTS = [ButtonModule,ToolbarModule,CardModule, DropdownModule,InputNumberModule,InputTextareaModule,InputTextModule,DialogModule, ToastModule,ConfirmDialogModule, MessageModule,TooltipModule, TableModule];
const LAYOUT_COMPONENTS = [
  HeaderComponent,

];
@NgModule({
  declarations: [
    ...LAYOUT_COMPONENTS
  ],
  imports: [
    CommonModule,
    ...PRIMENG_COMPONENTS
  ],
  exports:[...LAYOUT_COMPONENTS,...PRIMENG_COMPONENTS]
})
export class SharedModule { }
