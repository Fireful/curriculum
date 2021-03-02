import { Component, Input, OnInit } from '@angular/core';
import { Formacion } from 'src/app/models/formacion';
import { FormacionService } from 'src/app/services/formacion.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-formacion',
  templateUrl: './formacion.component.html',
  styleUrls: ['./formacion.component.scss'],
  providers: [FormacionService],
})
export class FormacionComponent implements OnInit {
  public url: string;
  @Input() formacion: Formacion;
  constructor(private _formacionService: FormacionService) {
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._formacionService.getFormaciones().subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
