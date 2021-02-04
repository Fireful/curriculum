import { Component, OnInit } from '@angular/core';

declare var $:any;
@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.scss']
})
export class ContenidoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
$('#tab1').click(function(){
  $('#tabs-formacion').slideToggle('slow');
  $('#tabs-experiencia').slideUp('slow');
  $('#tabs-conocimientos').slideUp('slow');
  $('#tabs-habilidades').slideUp('slow');

});
    $('#tab2').click(function(){
      $('#tabs-formacion').slideUp('slow');
      $('#tabs-experiencia').slideToggle('slow');
      $('#tabs-conocimientos').slideUp('slow');
      $('#tabs-habilidades').slideUp('slow');
    });
    $('#tab3').click(function(){
      $('#tabs-formacion').slideUp('slow');
      $('#tabs-experiencia').slideUp('slow');
      $('#tabs-conocimientos').slideToggle('slow');
      $('#tabs-habilidades').slideUp('slow');
    });
    $('#tab4').click(function(){
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
