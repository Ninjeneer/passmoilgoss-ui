import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { Orphan } from '../entities/orphan.entity';
import RestService from '../rest.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public orphan: Orphan;
  public chartData: ChartConfiguration['data'];
  public chartOptions: ChartConfiguration['options'];
  public isOrdered: boolean;

  constructor(private readonly activeRoute: ActivatedRoute, private readonly restService: RestService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.restService.findOrphan(id).subscribe((response) => {
          this.orphan = response.body;
          this.orphan.score = Math.round(this.orphan.score / 5)

          this.chartData = {
            labels: ['Intelligence', 'Beauté', 'Sociabilité', 'Calme', 'Hygiène'],
            datasets: [
              {
                label: 'Statistiques',
                data: [this.orphan.intelligence, this.orphan.beauty, this.orphan.sociability, this.orphan.calm, this.orphan.hygiene]
              }
            ]
          };
        })
      }
    })
  }

  order() {
    if (confirm("Voulez-vous faire une demande pour cet enfant ?")) {
      alert("Demande prise en compte, vous serez contacté par l'orphelinat sous peu.");
      this.isOrdered = true;
    }
  }

}
