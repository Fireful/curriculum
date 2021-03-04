import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.scss'],
})
export class AcercaComponent implements OnInit {
  public tecnologias: string[];

  public nombre: string;
  constructor(private _route: ActivatedRoute, private _router: Router) {}

  ngOnInit(): void {
    this._route.params.subscribe((params: Params) => {
      this.nombre = params.nombre;
    });
    this.tecnologias = [
      'html',
      'javascript',
      'sass',
      'css3',
      'less',
      'bootstrap',
      'flexbox',
      'grid',
      'responsive',
      'jquery',
      'jqueryui',
      'mongodb',
      'nodejs',
      'reactjs',
      'angular',
      'vue',
    ];
  }
}
