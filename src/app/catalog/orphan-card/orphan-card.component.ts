import { Component, Input, OnInit } from '@angular/core';

import { Orphan } from 'src/app/entities/orphan.entity';

@Component({
  selector: 'app-orphan-card',
  templateUrl: './orphan-card.component.html',
  styleUrls: ['./orphan-card.component.scss']
})
export class OrphanCardComponent implements OnInit {

  @Input() orphan: Orphan;

  constructor() { }

  ngOnInit(): void {
    this.orphan.score = Math.round(this.orphan.score / 4);
  }

}
