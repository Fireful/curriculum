import { Component, Injectable, OnInit } from '@angular/core';
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
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { resolveTypeReferenceDirective } from 'typescript';
import { Global } from 'src/app/services/global';

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
  selector: 'app-job-update',
  templateUrl: '../job-new/job-new.component.html',
  styleUrls: ['../job-new/job-new.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    [ExperienciaService],
  ],
})
@Injectable({
  providedIn: 'root',
})
export class JobUpdateComponent implements OnInit {
  public experiencia: Experiencia;
  fichero: string;
  fileLogo: any;
  inicio = new FormControl(moment());
  fin = new FormControl();
  createJob: FormGroup;
  actual: boolean = false;
  public status: string;
  public is_edit: boolean;

  afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg, .png, .jpeg, .gif',
    maxSize: 50,
    uploadAPI: {
      url: Global.url + 'upload-image',
    },
    theme: 'attachPin',
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube el logo',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit',
    },
  };

  constructor(
    private _experienciaService: ExperienciaService,
    private _route: ActivatedRoute,
    private _router: Router,
    private formBuilder: FormBuilder
  ) {
    this.experiencia = new Experiencia('', 'aa', '', null, null, '', '');
    this.is_edit = true;
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

  onSubmit() {
    this._experienciaService.create(this.experiencia).subscribe(
      (response) => {
        if (response.status == 'success') {
          this.status = 'success';
          this.experiencia = response.experiencia;
          this._router.navigate(['/cv']);
          console.log(this.experiencia);
        } else {
          this.status = 'error';
        }
      },
      (error) => {
        console.log(error);
        this.status = 'Error';
      }
    );
  }

  check() {
    if (this.actual) {
      this.actual = false;
    } else {
      this.actual = true;
      this.experiencia.fin = null;
    }
  }

  limpiar() {
    this.experiencia.empresa = '';
    this.experiencia.puesto = '';
    this.experiencia.descripcion = '';
    this.experiencia.inicio = null;
    this.experiencia.fin = null;
    this.experiencia.descripcion = '';

    this.createJob = this.formBuilder.group({
      fileLogo: [null],
      empres: [null],
      puest: [null],
      descJob: [null],
      inicio: [this.inicio.setValue(moment())],
      fin: [this.fin.setValue(moment())],
    });
  }

  logoUpload(data) {
    this.experiencia.logo = data.body.logo;
  }

  btnCancelar() {
    this._router.navigate(['/cv']);
  }

  ngOnInit(): void {
    this.getTrabajo();
  }

  getTrabajo() {
    this._route.params.subscribe((params) => {
      let id = params['id'];
      this._experienciaService.getJob(id).subscribe(
        (response) => {
          if (response.experiencia) {
            this.experiencia = response.jobUpdated;
          } else {
            this._router.navigate(['/home']);
          }
        }
        /*  (error) => {
          console.log('Error: ' + error);
          this._router.navigate(['home']);
        } */
      );
    });
  }
}
