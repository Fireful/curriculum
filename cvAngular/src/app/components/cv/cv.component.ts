import { Component, OnInit } from '@angular/core';
import { Conocimiento } from 'src/app/models/conocimiento';
import { Curso } from 'src/app/models/curso';
import { Formacion } from 'src/app/models/formacion';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from '../../services/experiencia.service';
import { FormacionService } from 'src/app/services/formacion.service';
import { CursoService } from 'src/app/services/curso.service';
import { ConocimientoService } from 'src/app/services/conocimiento.service';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var $: any;
@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
  providers: [
    ExperienciaService,
    FormacionService,
    CursoService,
    ConocimientoService,
  ],
})
export class CvComponent implements OnInit {
  public datos: string;
  public titulo: string = ' ';
  public jobs: Experiencia[];
  public formaciones: Formacion[];
  public cursos: Curso[];
  public conocimientos: Conocimiento[];

  closeResult = '';

  constructor(
    private modalService: NgbModal,
    private _experienciaService: ExperienciaService,
    private _formacionService: FormacionService,
    private _cursoService: CursoService,
    private _conocimientoService: ConocimientoService
  ) {}

  public getAsync = of(this.titulo).pipe(delay(5000));

  openConfirm(modalConfirm) {
    this.modalService.dismissAll();
    this.modalService
      .open(modalConfirm, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          alert(this.datos);
        }
      );
  }

  confirma() {
    alert(this.datos);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {
    alert('Hola');
    this._experienciaService.getJobs().subscribe(
      (response) => {
        if (response.jobs) {
          this.jobs = response.jobs;
        } else {
        }
      },
      (error) => {
        console.log(error);
      }
    );

    this._formacionService.getFormaciones().subscribe(
      (response) => {
        if (response.formaciones) {
          this.formaciones = response.formaciones;
        } else {
          console.log('No hay formaciones');
        }
      },
      (error) => {
        console.log(error);
      }
    );

    this._cursoService.getCursos().subscribe(
      (response) => {
        if (response.cursos) {
          this.cursos = response.cursos;
        } else {
          console.log('No hay cursos');
        }
      },
      (error) => {
        console.log(error);
      }
    );

    this._conocimientoService.getConocimientos().subscribe(
      (response) => {
        if (response.conocimientos) {
          this.conocimientos = response.conocimientos;
        } else {
          console.log('No hay conocimientos');
        }
      },
      (error) => {
        console.log(error);
      }
    );

    /* for (var j = 1; j < this.jobs.length; j++) {
      $('#titulo-trabajo' + j).click(function () {
        $('#descTrabajo' + j).slideToggle('slow');
      });
    } */
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
