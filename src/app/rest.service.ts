import { HttpClient, HttpResponse } from "@angular/common/http";

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Orphan } from "./entities/orphan.entity";

@Injectable()
export default class RestService {
  constructor(private readonly httpClient: HttpClient) {}

  private backend = "http://intensif03.ensicaen.fr:8080";

  public findAllOrphans(): Observable<HttpResponse<Orphan[]>> {
    return this.httpClient.get<Orphan[]>(`${this.backend}/orphans`, { observe: 'response' });
  }

  public findOrphan(id: string): Observable<HttpResponse<Orphan[]>> {
    return this.httpClient.get<Orphan[]>(`${this.backend}/orphans/${id}`, { observe: 'response' });
  }

  public findCountries(): Observable<HttpResponse<string[]>> {
    return this.httpClient.get<string[]>(`${this.backend}/orphans/countries`, { observe: 'response' });
  }

}