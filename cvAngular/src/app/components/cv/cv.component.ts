import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso';
import { Formacion } from 'src/app/models/formacion';
import { Trabajo } from 'src/app/models/trabajo';

declare var $: any;
@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
})
export class CvComponent implements OnInit {
  public titulo: string;
  public trabajos: Trabajo[];
  public i: number = 1;
  public j: number = 1;
  closeResult = '';
  public formaciones: Formacion[];
  public cursos: Curso[];
  constructor() {
    this.titulo = 'Curriculum Vitae';

    this.trabajos = [
      new Trabajo(
        this.i,
        'Melit',
        new Date('10/05/2020'),
        new Date('12/25/2020'),
        'Trabajo con Angular'
      ),
      new Trabajo(
        (this.i += 1),
        'Web Financial Group',
        new Date('12/05/2012'),
        new Date('08/10/2015'),
        'Trabajo con Angular'
      ),
    ];
    this.formaciones = [
      new Formacion(
        this.i,
        'C.F.G.S. Desarrollo de Aplicaciones Web',
        'I.E.S. Vista Alegre',
        new Date('09/10/2018'),
        new Date('07/25/2020'),
        'Texto del curso 1',
        ''
      ),
      new Formacion(
        (this.i += 1),
        'C.F.G.S. Administración de Sistemas Informáticos',
        'I.E.S. Leonardo da Vinci',
        new Date('09/10/2002'),
        new Date('07/25/2004'),
        'Texto del curso 2',
        ''
      ),
    ];
    this.cursos = [
      new Curso(
        this.i,
        'C.F.G.S. Desarrollo de Aplicaciones Web',
        'I.E.S. Vista Alegre',
        new Date('09/10/2018'),
        new Date('07/25/2020'),
        'Texto del curso 1',
        ''
      ),
      new Curso(
        (this.i += 1),
        'Master en CSS',
        'Udemy - Victor Robles Web',
        new Date('09/10/2002'),
        new Date('07/25/2004'),
        'Texto del curso 2',
        'certificados/css.jpg'
      ),
    ];
  }

  ngOnInit(): void {
    for (var j = 1; j < this.trabajos.length; j++) {
      $('#titulo-trabajo' + j).click(function () {
        $('#descTrabajo' + j).slideToggle('slow');
      });
    }
    $('#tab1').click(function () {
      $('#tabs-formacion').slideDown('slow');
      $('#tabs-experiencia').slideUp('slow');
      $('#tabs-conocimientos').slideUp('slow');
      $('#tabs-habilidades').slideUp('slow');
    });
    $('#tab2').click(function () {
      $('#form-academica').slideUp('slow');
      $('#otra-formacion').slideUp('slow');
      $('#tabs-formacion').slideUp('slow');
      $('#tabs-experiencia').slideToggle('slow');
      $('#tabs-conocimientos').slideUp('slow');
      $('#tabs-habilidades').slideUp('slow');
    });
    $('#tab3').click(function () {
      $('#form-academica').slideUp('slow');
      $('#otra-formacion').slideUp('slow');
      $('#tabs-formacion').slideUp('slow');
      $('#tabs-experiencia').slideUp('slow');
      $('#tabs-conocimientos').slideToggle('slow');
      $('#tabs-habilidades').slideUp('slow');
    });
    $('#tab4').click(function () {
      $('#form-academica').slideUp('slow');
      $('#otra-formacion').slideUp('slow');
      $('#tabs-formacion').slideUp('slow');
      $('#tabs-experiencia').slideUp('slow');
      $('#tabs-conocimientos').slideUp('slow');
      $('#tabs-habilidades').slideToggle('slow');
    });

    $('#tituloFormacion').click(function () {
      $('#formacion').slideToggle('slow');
    });

    $('#tituloForm-academica').click(function () {
      $('#form-academica').slideToggle('slow');
      $('#otra-formacion').slideUp('slow');
    });

    $('#tituloOtra-formacion').click(function () {
      $('#form-academica').slideUp('slow');
      $('#otra-formacion').slideToggle('slow');
    });
  }
}
