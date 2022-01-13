import { HttpClient, HttpResponse } from "@angular/common/http";

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Orphan } from "./entities/orphan.entity";
import config from '../assets/config.json';

@Injectable()
export default class RestService {
  constructor(private readonly httpClient: HttpClient) { }

  public findAllOrphans(params): Observable<HttpResponse<Orphan[]>> {
    return this.httpClient.get<Orphan[]>(`${config.host}/orphans`, { params, observe: 'response' });
  }

  public findOrphan(id: string): Observable<HttpResponse<Orphan>> {
    return this.httpClient.get<Orphan>(`${config.host}/orphans/${id}`, { observe: 'response' });
  }

  public findCountries(): Observable<HttpResponse<string[]>> {
    return this.httpClient.get<string[]>(`${config.host}/orphans/countries`, { observe: 'response' });
  }

}
