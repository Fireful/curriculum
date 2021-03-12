import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user_old';
import { UserService } from 'src/app/services/user.service';

declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [UserService],
})
export class HeaderComponent implements OnInit {
  public pwd: string;
  public user: string;
  public nombre: string;
  public apellidos: string;
  public email: string;
  public password: string;
  public repassword: string;
  closeResult = '';
  public users: User[];
  public userRegister: any;
  constructor(
    private _userService: UserService,
    private modalService: NgbModal
  ) {}

  onLogin() {
    alert('Usuario logado');
    alert(this._userService);
    if (this.pwd != this._userService.getUsers[0]) {
      alert('ayay');
    }
    console.log(this.users);
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

    /* this._userService.getUsers().subscribe(
      (response) => {
        if (response.users) {
          this.users = response.users;
        } else {
          console.log('No hay usuarios');
        }
      },
      (error) => {
        console.log(error);
      }
    ); */
  }
}
