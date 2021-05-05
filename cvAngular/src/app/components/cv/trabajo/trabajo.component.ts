import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Experiencia } from 'src/app/models/experiencia';
import { Global } from 'src/app/services/global';
import { ExperienciaService } from '../../../services/experiencia.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { default as _rollupMoment, Moment } from 'moment';
import { resolveTypeReferenceDirective } from 'typescript';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-trabajo',
  templateUrl: './trabajo.component.html',
  styleUrls: ['./trabajo.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    ExperienciaService,
  ],
})
export class TrabajoComponent implements OnInit {
  inicio = new FormControl(moment());
  fin = new FormControl();
  public experiencia: Experiencia;
  public url: string;
  @Input() trabajo: Experiencia;
  closeResult = '';
  public status: string;
  actual: boolean = false;

  constructor(
    private modalService: NgbModal,
    private _experienciaService: ExperienciaService
  ) {
    this.url = Global.url;
  }
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValueInicio = this.inicio.value;
    const ctrlValueFin = this.fin.value;

    ctrlValueInicio.year(normalizedYear.year());
    ctrlValueFin.year(normalizedYear.year());

    this.inicio.setValue(ctrlValueInicio);
    this.fin.setValue(ctrlValueFin);
  }

  chosenMonthHandler(
    normalizedMonth: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValueInicio = this.inicio.value;
    const ctrlValueFin = this.fin.value;

    ctrlValueInicio.month(normalizedMonth.month());
    ctrlValueFin.month(normalizedMonth.month());

    this.inicio.setValue(ctrlValueInicio);
    this.fin.setValue(ctrlValueFin);

    datepicker.close();
  }

  check() {
    if (this.actual) {
      this.actual = false;
    } else {
      this.actual = true;
    }
  }

  openTrabajo(modalTrabajo, id) {
    this.modalService.dismissAll();
    this.modalService
      .open(modalTrabajo, {
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
        size: 'lg',
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  editTrabajo(modalEditTrabajo, id) {
    this.modalService.dismissAll();
    this.modalService
      .open(modalEditTrabajo, {
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
        size: 'lg',
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  updateTrabajo(id) {
    alert(id);
    /*  this._experienciaService
      .update(this.experiencia._id, this.experiencia)
      .subscribe(
        (response) => {
          if (response.status == 'success') {
            this.status = 'success';
            this.experiencia = response.experiencia;
            //this._router.navigate(['/cv']);
            console.log(this.experiencia);
          } else {
            this.status = 'error';
          }
        },
        (error) => {
          console.log(error);
          this.status = 'Error';
        }
      ); */
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

  onSubmit() {}

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
