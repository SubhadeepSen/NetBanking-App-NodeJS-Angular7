import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { TransactionComponent } from './transaction/transaction.component';
import { AccountComponent } from './account/account.component';
import { AccounthomeComponent } from './accounthome/accounthome.component';

@NgModule({
  declarations: [SettingsComponent, TransactionComponent, AccountComponent, AccounthomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class HomeModule { }
