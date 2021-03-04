import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  public url: string;
  @Input() trabajo: Experiencia;
  closeResult = '';

  constructor(
    private modalService: NgbModal,
    private _experienciaService: ExperienciaService
  ) {
    this.url = Global.url;
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
