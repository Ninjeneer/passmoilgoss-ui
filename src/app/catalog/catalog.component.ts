import { Component, OnInit } from '@angular/core';

import { Orphan } from '../entities/orphan.entity';
import RestService from '../rest.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  public orphans: Orphan[] = [];
  public countries: string[] = [];

  constructor(private readonly restService: RestService) { }

  ngOnInit(): void {
    this.restService.findAllOrphans().subscribe((response) => {
      this.orphans = response.body;
    });

    this.restService.findCountries().subscribe((response) => {
      this.countries = response.body;
    });
  }

}
