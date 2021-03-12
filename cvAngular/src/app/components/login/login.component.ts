import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService],
})
export class LoginComponent implements OnInit {
  public pwd: string;
  public user: string;
  closeResult = '';
  constructor(private _userService: UserService) {}

  onLogin() {
    alert('Hola');
  }

  ngOnInit(): void {
    this._userService.getUsers().subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
