import { Component, Input, OnInit } from '@angular/core';
import { Conocimiento } from 'src/app/models/conocimiento';
import { ConocimientoService } from 'src/app/services/conocimiento.service';
import { Global } from 'src/app/services/global';

declare var $: any;
@Component({
  selector: 'app-conocimiento',
  templateUrl: './conocimiento.component.html',
  styleUrls: ['./conocimiento.component.scss'],
  providers: [ConocimientoService],
})
export class ConocimientoComponent implements OnInit {
  public url: string;
  @Input() conocimiento: Conocimiento;

  constructor(private _conocimientoService: ConocimientoService) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._conocimientoService.getConocimientos().subscribe(
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
  }
}
