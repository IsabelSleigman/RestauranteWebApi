import { AberturaModel } from './../inicial/models/abertura-model';
import { Injectable } from "@angular/core";
import { take } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Params, Router } from '@angular/router';
const baseUrl = `${environment.apiUrl}/comanda`

@Injectable()

export class HomeService {

    comandaId: number;
    
    constructor(private http: HttpClient,
        private router: Router,
        private route: ActivatedRoute) {
    }

    iniciar(iniciar: AberturaModel) {

        return this.http
            .post<number>( `${baseUrl}`, iniciar)
            .pipe(
                take(1)).subscribe(id => this.comandaId = id);

    }

  
}