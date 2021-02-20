import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

declare var $: any;
@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
})
export class CvComponent implements OnInit {
  public titulo: string;
  closeResult = '';
  public formaciones: Array<any>;
  constructor(private modalService: NgbModal) {
    this.titulo = 'Curriculum Vitae';
    this.formaciones = [
      {
        id: 1,
        titulo: 'css',
        texto: 'Texto del curso 1',
      },
      {
        id: 2,
        titulo: 'Titulo del curso 2',
        texto: 'Texto del curso 2',
      },
    ];
  }

  openCertificado(modalCertificado, id) {
    this.modalService.dismissAll();
    this.modalService
      .open(modalCertificado, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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
    $('#titulo-trabajo').click(function () {
      $('#descTrabajo').slideToggle('slow');
    });
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
