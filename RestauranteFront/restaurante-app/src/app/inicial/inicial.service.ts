import { NotificationService } from './../shared/snackbar/notification.service';
import { Injectable } from "@angular/core";
import { take, catchError } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { MesaModel } from "./models/mesa-model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({ providedIn: 'root' })

export class InicialService {

  baseUrl = `${environment.apiUrl}/mesa`

  constructor(private http: HttpClient,
    private snackbar: NotificationService) {
  }

  obterMesas() {
    return this.http
      .get<MesaModel[]>(this.baseUrl)
      .pipe(
        take(1),
        catchError((error: HttpErrorResponse) => {
          this.snackbar.errorMessage(error
          );
          throw error;
        })
      );
  }
}