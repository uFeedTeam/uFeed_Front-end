import {Component} from "@angular/core";
import {UserCredentials} from "../user/UserCredentials";

@Component({
    moduleId: module.id,
    selector: 'login-component',
    templateUrl: 'login-component.html'
})
export class LoginComponent {
    user: UserCredentials = new UserCredentials('', '', '');
}