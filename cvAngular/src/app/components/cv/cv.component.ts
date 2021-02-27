import { Component, OnInit } from '@angular/core';
import { Conocimiento } from 'src/app/models/conocimiento';
import { Curso } from 'src/app/models/curso';
import { Formacion } from 'src/app/models/formacion';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from '../../services/experiencia.service';

declare var $: any;
@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
  providers: [ExperienciaService],
})
export class CvComponent implements OnInit {
  public titulo: string;
  public jobs: Experiencia[];
  public idTrabajo: number = 1;
  public idFormacion: number = 1;
  public idConocimiento: number = 1;
  public idCurso: number = 1;
  closeResult = '';
  public formaciones: Formacion[];
  public cursos: Curso[];

  public conocimientos: Conocimiento[];
  constructor(private _experienciaService: ExperienciaService) {
    this.titulo = 'Curriculum Vitae';
    this.jobs = [
      new Experiencia(
        this.idTrabajo,
        '',
        'Melit',
        new Date('10/05/2020'),
        new Date('12/25/2020'),
        'Programador',
        'Trabajo con Angular'
      ),
      new Experiencia(
        (this.idTrabajo += 1),
        '',
        'Web Financial Group',
        new Date('12/05/2012'),
        new Date('08/10/2015'),
        'Desarrollador web',
        'Trabajo con Angular'
      ),
    ];
    this.formaciones = [
      new Formacion(
        this.idFormacion,
        'C.F.G.S. Desarrollo de Aplicaciones Web',
        'I.E.S. Vista Alegre',
        new Date('09/10/2018'),
        new Date('07/25/2020'),
        'Texto del curso 1',
        ''
      ),
      new Formacion(
        (this.idFormacion += 1),
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
        this.idCurso,
        'C.F.G.S. Desarrollo de Aplicaciones Web',
        'I.E.S. Vista Alegre',
        new Date('09/10/2018'),
        new Date('07/25/2020'),
        'Texto del curso 1',
        ''
      ),
      new Curso(
        (this.idCurso += 1),
        'Master en CSS',
        'Udemy - Victor Robles Web',
        new Date('09/10/2002'),
        new Date('07/25/2004'),
        'Texto del curso 2',
        'certificados/css.jpg'
      ),
    ];
    this.conocimientos = [
      new Conocimiento(this.idConocimiento, 'JavaScript', 75),
      new Conocimiento((this.idConocimiento += 1), 'HTML', 95),

      new Conocimiento((this.idConocimiento += 1), 'Java', 50),
    ];
  }

  ngOnInit(): void {
    this._experienciaService.getJobs().subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    $(document).ready(function () {
      var bars = $('.progress-bar');

      for (var i = 0; i < bars.length; i++) {
        console.log(i);
        var progress = $(bars[i]).attr('aria-valuenow');
        $(bars[i]).width(progress + '%');

        if (progress >= '65') {
          $(bars[i]).addClass('bar-success');
        } else if (progress >= '40' && progress < '65') {
          $(bars[i]).addClass('bar-warning');
        } else {
          $(bars[i]).addClass('bar-error');
        }
      }
    });
    for (var j = 1; j < this.jobs.length; j++) {
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
