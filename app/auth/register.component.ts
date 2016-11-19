import {Component} from "@angular/core";
import {UserCredentials} from "../user/UserCredentials";
@Component({
    moduleId: module.id,
    selector: 'register-component',
    templateUrl: 'register-component.html'
})
export class RegisterComponent {

    confirmPass: string = "";
    user: UserCredentials = new UserCredentials('', '', '');

}