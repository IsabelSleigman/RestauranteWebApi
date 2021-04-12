import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NgModule } from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from "@angular/material/core";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { HumanizeFormMessagesPipe } from './pipes/humanize.pipe';
import { NotificationService } from './snackbar/notification.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
    declarations: [

        HeaderComponent,
        HumanizeFormMessagesPipe

    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatToolbarModule,
        MatListModule,
        MatTabsModule,
        MatButtonModule,
        MatInputModule,
        MatGridListModule,
        FlexLayoutModule,
        MatDialogModule,
        MatOptionModule,
        FormsModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        MatSnackBarModule
      



    ],
    exports: [
        MatCardModule,
        MatToolbarModule,
        MatListModule,
        MatTabsModule,
        MatButtonModule,
        MatInputModule,
        MatGridListModule,
        HeaderComponent,
        FlexLayoutModule,
        CommonModule,
        MatDialogModule,
        MatOptionModule,
        FormsModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        HumanizeFormMessagesPipe,
        MatSnackBarModule
    ],
    providers: [
        NotificationService
    ]
})
export class SharedModule { }