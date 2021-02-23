import { Component, Input, OnInit } from '@angular/core';
import { Formacion } from 'src/app/models/formacion';

@Component({
  selector: 'app-formacion',
  templateUrl: './formacion.component.html',
  styleUrls: ['./formacion.component.scss'],
})
export class FormacionComponent implements OnInit {
  @Input() formacion: Formacion;
  constructor() {}

  ngOnInit(): void {}
}
