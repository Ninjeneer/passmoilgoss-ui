import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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

  public filterGroup: FormGroup;
  private filters: Map<string, string | string[]> = new Map();

  constructor(private readonly restService: RestService) { }

  ngOnInit(): void {
    this.filterGroup = new FormGroup({
      gender: new FormControl('both'),
      firstname: new FormControl('')
    });

    this.filterGroup.get('gender').valueChanges.subscribe((val) => {
      if (val === 'both') {
        this.filters.set('gender', undefined);
      } else {
        this.filters.set('gender', val);
      }
      this.refreshOrphanList();
    });

    this.filterGroup.get('firstname').valueChanges.subscribe((val) => {
      this.filters.set('firstname', val);
      this.refreshOrphanList();
    })

    this.refreshOrphanList();

    this.restService.findCountries().subscribe((response) => {
      this.countries = response.body;
    });
  }

  countryChange() {
    const checkedCountries = Array.from(document.querySelectorAll(".countryCb:checked")).map(c => c.getAttribute('value'));
    this.filters.set('countries', checkedCountries);
    this.refreshOrphanList();
  }

  refreshOrphanList() {
    console.log(Object.fromEntries(this.filters.entries()))
    this.restService.findAllOrphans(Object.fromEntries(this.filters.entries())).subscribe((response) => {
      this.orphans = response.body;
    });
  }
}
