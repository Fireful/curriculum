import { Component, Input, OnInit } from '@angular/core';
import { Pelicula } from '../../../models/pelicula';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.scss'],
})
export class PeliculaComponent implements OnInit {
  @Input() pelicula: Pelicula;
  constructor() {}

  ngOnInit(): void {}
}
