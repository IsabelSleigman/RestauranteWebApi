import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NgModule } from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatDialogModule} from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent

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
        ReactiveFormsModule
        

    ],
    exports: [
        MatCardModule,
        MatToolbarModule,
        MatListModule,
        MatTabsModule,
        MatButtonModule,
        MatInputModule,
        MatGridListModule,
        FooterComponent,
        HeaderComponent,
        FlexLayoutModule,
        CommonModule,
        MatDialogModule,
        MatOptionModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: []
})
export class SharedModule { }