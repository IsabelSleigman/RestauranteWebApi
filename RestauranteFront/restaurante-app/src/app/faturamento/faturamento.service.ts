import { TotalFaturamento } from './models/totalFaturamento';
import { AbertasFaturamento } from './models/abertasFaturamento';
import { Injectable } from "@angular/core";
import { catchError, take } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { NotificationService } from '../shared/snackbar/notification.service';
import { FechadasFaturamento } from './models/fechadasFaturamento';
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
    
    obterFechadas() {
        return this.http
            .get<FechadasFaturamento[]>(`${baseUrl}/fechadas`)
            .pipe(
                take(1),
                catchError((error: HttpErrorResponse) => {
                    this.notificationService.errorMessage(error
                    );
                    throw error;
                })
            );
    }

    obterRelatorio() {
        return this.http
            .get<TotalFaturamento>(`${baseUrl}/buscatotal`)
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