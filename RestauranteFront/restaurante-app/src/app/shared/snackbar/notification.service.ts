import { style } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  private configError: MatSnackBarConfig ={
    duration: 4000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['error-snackbar']
  }

  private configOk: MatSnackBarConfig ={
    duration: 4000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['ok-snackbar']
  }

  errorMessage(error: HttpErrorResponse){
    let msg = error.error.split(':', 2)[1].split(' at', 1);
    this.snackBar.open(msg,'',this.configError);
  }

  successMessage(msg: string){
    this.snackBar.open(msg,'',this.configOk);
  }
}