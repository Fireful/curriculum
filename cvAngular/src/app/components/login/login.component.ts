import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public pwd: string;
  public user: string;
  closeResult = '';
  constructor() {}

  onLogin(form) {
    alert('Hola');
  }

  ngOnInit(): void {}
}
