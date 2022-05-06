import { Injectable } from '@angular/core';
import { CalcDTO } from 'src/@core/DTO/CalcDTO';
import {HttpClient, HttpResponse} from "@angular/common/http";
import { interval, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class MainPageService {
  private port = "8443"
  private url = `http://localhost:${this.port}/api/service/result`;

  constructor(
    private http: HttpClient
  ) { }

  save(mainPage: CalcDTO): Promise<CalcDTO> {
    return lastValueFrom((this.http.post<CalcDTO>(`${this.url}/`, mainPage))) 
  }

  getById(id: number): Promise<CalcDTO> {
    return lastValueFrom((this.http.get<CalcDTO>(`${this.url}/${id}`)));
  }

  getAll(mainPage: CalcDTO): Promise<CalcDTO[]> {
    return lastValueFrom((this.http.get<CalcDTO[]>(`${this.url}/all`)));
  }

  deleteAll(): Promise<CalcDTO> {
    return lastValueFrom((this.http.delete<CalcDTO>(`${this.url}/delete/all`)))
  }
}

