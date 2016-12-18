import {Component} from "@angular/core";
import {UserCredentials} from "../user/UserCredentials";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
    moduleId: module.id,
    selector: 'login-component',
    templateUrl: 'login-component.html'
})
export class LoginComponent {
    user: UserCredentials = new UserCredentials('', '', '');
    submitted: boolean = false;

    constructor(private authService: AuthService, private router: Router) {
    }

    login() {
        this.submitted = true;
        this.authService.login(this.user)
            .subscribe(
                good => {
                    this.router.navigate(['/edit']);
                },
                err => {
                    alert(err);
                    this.submitted = false;
                }
            )
    }

}