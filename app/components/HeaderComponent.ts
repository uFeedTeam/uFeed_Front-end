import {Component} from "@angular/core";
import {UserAuthenticationService} from "../services/UserAuthenticationService";
import {Router} from "@angular/router";
@Component({
    selector: 'header-dir',
    template: `
        <div class="headMenu">
            <div class="headLogo">
                <a href="index.html"><img src="content/images/logo.png" class="logoImage"></a>
            </div>
            
            <div *ngIf="!isLogined()" class="headLinks">
                <a routerLink="/login"> <img src="content/images/login.png" class="headlink"></a>
                <a routerLink="/register"><img src="content/images/signUp.png" class="headlink"></a>
            </div>
            <div *ngIf="isLogined()" class="headLinks">
                <a (click)="logout()">Logout</a>
            </div>
            
        </div>        
`
})
export class HeaderComponent {

    constructor(private authService: UserAuthenticationService,
    private router: Router)
    {}

    logout() {
        this.authService.logout();
        this.router.navigate(['/']);
    }

    // todo
    isLogined(): boolean {
        return this.authService.isLogined;
    }

}