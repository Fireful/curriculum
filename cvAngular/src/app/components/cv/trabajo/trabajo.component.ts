import { Component, Input, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/models/experiencia';
import { Global } from 'src/app/services/global';
import { ExperienciaService } from '../../../services/experiencia.service';

@Component({
  selector: 'app-trabajo',
  templateUrl: './trabajo.component.html',
  styleUrls: ['./trabajo.component.scss'],
  providers: [ExperienciaService],
})
export class TrabajoComponent implements OnInit {
  public url:string;
  @Input() trabajo: Experiencia;

  constructor(private _experienciaService: ExperienciaService) {
    this.url=Global.url;
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
  }
}
