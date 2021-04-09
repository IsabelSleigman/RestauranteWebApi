import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeService } from 'src/app/home/home.service';

@Component({
  selector: 'app-retomar-comanda',
  templateUrl: './retomar-comanda.component.html',
  styleUrls: ['./retomar-comanda.component.scss']
})
export class RetomarComandaComponent implements OnInit {

  mesaId : number = 0;

  constructor(public dialogRef: MatDialogRef<RetomarComandaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {mesaId:number}, private homeService: HomeService) {
      this.mesaId = data.mesaId; }

  ngOnInit(): void {
  }

 retomar(){
   this.homeService.retomarComanda(this.mesaId);
 }
 cancelar() {
  this.dialogRef.close();
}

}
