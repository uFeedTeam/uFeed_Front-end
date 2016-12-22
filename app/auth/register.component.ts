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
    submitted: boolean = false;

    constructor(private authService: AuthService, private router: Router) {
    }

    login(): void {

    }

    register(): void {
        this.authService.register(this.user)
            .subscribe(
                (resp)=> {
                    this.submitted = false;
                    this.router.navigate(['/login']);
                },
                (err) => {
                    // todo replace
                    alert(JSON.stringify(err));
                    this.submitted = false;
                });
    }
}