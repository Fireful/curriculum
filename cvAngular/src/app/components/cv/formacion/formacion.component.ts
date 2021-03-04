import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  closeResult = '';
  constructor(
    private modalService: NgbModal,
    private _formacionService: FormacionService
  ) {
    this.url = Global.url;
  }

  openTitulo(modalTitulacion, id) {
    this.modalService.dismissAll();
    this.modalService
      .open(modalTitulacion, { ariaLabelledBy: 'modal-basic-title' })
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
