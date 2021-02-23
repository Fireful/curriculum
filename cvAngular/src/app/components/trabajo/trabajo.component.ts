import { Component, Input, OnInit } from '@angular/core';
import { Trabajo } from 'src/app/models/trabajo';

@Component({
  selector: 'app-trabajo',
  templateUrl: './trabajo.component.html',
  styleUrls: ['./trabajo.component.scss'],
})
export class TrabajoComponent implements OnInit {
  @Input() trabajo: Trabajo;

  constructor() {}

  ngOnInit(): void {}
}
