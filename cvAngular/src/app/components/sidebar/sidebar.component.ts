import { Component, OnInit } from '@angular/core';

declare var $: any;
var i: number = 0;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    /* Jquery */
    $('#botonDatos').click(function () {
      $('.sidebarizq').fadeIn('slow');
    });
  }
}
