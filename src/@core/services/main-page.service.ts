import { Injectable } from '@angular/core';
import { CalcDTO } from 'src/@core/DTO/CalcDTO';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})


export class MainPageService {
  private port = "8443"
  private url = `http://localhost:${this.port}/api/service/result`;

  constructor(
    private http: HttpClient
  ) { }

  save(mainPage: CalcDTO): Observable<CalcDTO> {
    console.log(mainPage)
    return this.http.post<CalcDTO>(`${this.url}/`, mainPage);
  }

  getById(id: number): Observable<CalcDTO> {
    return this.http.get<CalcDTO>(`${this.url}/${id}`)
  }
}

