import {Component} from "@angular/core";
import {UserCredentials} from "../user/UserCredentials";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
@Component({
    moduleId: module.id,
    selector: 'register-component',
    templateUrl: 'register-component.html'
})
export class RegisterComponent {

    confirmPass: string = "";
    user: UserCredentials = new UserCredentials('', '', '');
    errMsg: string;

    constructor(private authService: AuthService, private router: Router) {
    }

    login(): void {

    }

    register(): void {
        this.authService.register(this.user)
            .subscribe(
                (resp)=> {
                    this.router.navigate(['/login']);
                },
                (err) => {
                    // todo replace
                    alert(JSON.stringify(err));
                });
    }
}