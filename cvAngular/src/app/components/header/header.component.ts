import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  closeResult = '';
  public userLogin: any;
  public userRegister: any;
  constructor(private modalService: NgbModal) {
    this.userLogin = {
      username: '',
      password: '',
    };
    this.userRegister = {
      nombre: '',
      apellidos: '',
      email: '',
      password: '',
      repassword: '',
    };
  }

  onLogin() {
    alert('Usuario logado');
    console.log(this.userLogin);
  }

  onRegister() {
    alert('Usuario registrado');
    console.log(this.userRegister);
  }

  openRegistro(modalRegistro) {
    this.modalService.dismissAll();
    this.modalService
      .open(modalRegistro, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  openLogin(modalLogin) {
    this.modalService.dismissAll();
    this.modalService
      .open(modalLogin, { ariaLabelledBy: 'modal-basic-title' })
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
    $('button').click(function () {
      $('#jquery').slideToggle('slow');
    });
  }
}
