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
  public hairs = ['Blond', 'Brun', 'Châtain', 'Roux'];
  public eyes = ['Bleu', 'Marron', 'Vert'];

  public showCountries: boolean;
  public showHairs: boolean;
  public showEyes: boolean;

  public filterGroup: FormGroup;
  public sortGroup: FormGroup;
  private filters: Map<string, string> = new Map();

  constructor(private readonly restService: RestService) { }

  ngOnInit(): void {
    this.filterGroup = new FormGroup({
      gender: new FormControl('both'),
      firstname: new FormControl(''),
    });

    this.sortGroup = new FormGroup({
      sort: new FormControl('none')
    });

    this.filterGroup.get('gender').valueChanges.subscribe((val) => {
      if (val === 'both') {
        this.filters.delete('gender')
      } else {
        this.filters.set('gender', val);
      }
      this.refreshOrphanList();
    });

    this.filterGroup.get('firstname').valueChanges.subscribe((val) => {
      this.filters.set('firstname', val);
      this.refreshOrphanList();
    });

    this.sortGroup.get('sort').valueChanges.subscribe((val) => {
      this.refreshOrphanList();
    });

    this.refreshOrphanList();

    this.restService.findCountries().subscribe((response) => {
      this.countries = response.body;
    });
  }

  countryChange() {
    const checkedCountries = Array.from(document.querySelectorAll(".countryCb:checked")).map(c => c.getAttribute('value'));
    if (checkedCountries.join('|') === '') {
      this.filters.delete('countries')
    } else {
      this.filters.set('countries', checkedCountries.join('|'));
    }
    this.refreshOrphanList();
  }

  hairChange() {
    const checkedHairs = Array.from(document.querySelectorAll(".hairCb:checked")).map(c => c.getAttribute('value'));
    if (checkedHairs.join('|') === '') {
      this.filters.delete('hairs')
    } else {
      this.filters.set('hairs', checkedHairs.join('|'));
    }
    this.refreshOrphanList();
  }

  eyeChange() {
    const checkedEye = Array.from(document.querySelectorAll(".eyeCb:checked")).map(c => c.getAttribute('value'));
    if (checkedEye.join('|') === '') {
      this.filters.delete('eyes')
    } else {
      this.filters.set('eyes', checkedEye.join('|'));
    }
    this.refreshOrphanList();
  }

  refreshOrphanList() {
    console.log(Object.fromEntries(this.filters.entries()))
    this.restService.findAllOrphans({ ...Object.fromEntries(this.filters.entries()), sort: this.sortGroup.get('sort').value }).subscribe((response) => {
      this.orphans = response.body;
    });
  }

  toggle(section: string) {
    switch (section) {
      case 'countries':
        this.showCountries = !this.showCountries;
        break;
      case 'hairs':
        this.showHairs = !this.showHairs;
        break;
      case 'eyes':
        this.showEyes = !this.showEyes;
        break;
    }
  }
}
