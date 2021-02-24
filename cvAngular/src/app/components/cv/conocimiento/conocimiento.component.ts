import { Component, Input, OnInit } from '@angular/core';
import { Conocimiento } from 'src/app/models/conocimiento';

@Component({
  selector: 'app-conocimiento',
  templateUrl: './conocimiento.component.html',
  styleUrls: ['./conocimiento.component.scss'],
})
export class ConocimientoComponent implements OnInit {
  @Input() conocimiento: Conocimiento;
  constructor() {}

  ngOnInit(): void {}
}
