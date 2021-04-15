import { AbertasFaturamento } from './models/abertasFaturamento';
import { Injectable } from "@angular/core";
import { catchError, take} from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { NotificationService } from '../shared/snackbar/notification.service';
const baseUrl = `${environment.apiUrl}/faturamento`

@Injectable({ providedIn: 'root' })

export class FaturamentoService {

    constructor(private http: HttpClient,
        private notificationService: NotificationService) {
    }

    obterAbertas() {
        return this.http
          .get<AbertasFaturamento[]>(`${baseUrl}/abertas`)
          .pipe(
            take(1),
            catchError((error: HttpErrorResponse) => {
              this.notificationService.errorMessage(error
              );
              throw error;
            })
          );
      }

   


}