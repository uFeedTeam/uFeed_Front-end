import {Component} from "@angular/core";
import {UserAuthenticationService} from "../services/UserAuthenticationService";
import {UserCredentials} from "../model/UserCredentials";
import {Router} from "@angular/router";
@Component({
    selector: 'login',
    template: `
        <div class="content">
            <div class="contentHeader">
                <div class="mainLogoContainer">
                    <img src="content/images/mainLogo.png" class="mainLogo">
                </div>
                <div class="mainDescription mainText">
                    <p>allows you to posts, new or other items from different social networks <br>
                    into custom categories and keep it in one place and one format!</p>
                </div>
            </div>
            <div class="container container-custom">
                <div class="login-container">
                    <div class="exit">
                        <a routerLink="/"><img src="content/images/exit.png" class="exitLink"></a>
                    </div>
                    <div class="bodyForm">
                        <form #form="ngForm" (submit)="onSubmit($event)">
                            <input required  class="materialInput" [(ngModel)]="user.Email" name="email" placeholder="Email" type="email">
                            <br>
                            <input required class="materialInput" [(ngModel)]="user.Password" name="password" placeholder="Password" type="password">
                            <h4 *ngIf="errorMsg" style="color: black">{{errorMsg}}</h4>
                            <input type="submit" type="image" src="content/images/logInL.png" class="submitButton">
                        </form>
                    </div>
                </div>
            </div>
            <div class="contentBody">
                <div class="features mainText" style="
    position: relative;
    top: 30px;
">
                    <ul>
                        <h2>YOU ARE ABLE TO:</h2>
                        <li><img src="content/images/unite_icon.png" class="ulIcon">unite a content from different social networks</li>
                        <br>
                        <li><img src="content/images/category_icon.png" class="ulIcon">create custom categories for this content</li>
                        <br>
                        <li><img src="content/images/like_icon.png" class="ulIcon">mark content as favourite to keep it in one place <br>      and make it easy to access</li>
                    </ul>
                    <a routerLink="/"><img src="content/images/letsStart.png" class="startUpLink"></a>
                </div>
                <div class="contentImage">
                    <img src="content/images/computer.png" class="mainImage">
                </div>
            </div>            
        </div> 
    `
})
export class UserLoginComponent {

    private errorMsg: string = "";
    user: UserCredentials = new UserCredentials('', '', '', '');

    constructor(private authService: UserAuthenticationService,
    private router: Router) {}

    private validatePassword(user: UserCredentials): boolean {
        let pass = user.Password;

        let isValid: boolean = true;
        isValid = isValid && pass.search("\\w") != -1
            && pass.search("\\d") != -1
            && pass.length >= 6;

        if(!isValid) {
            this.errorMsg = "Password must contain at list 6 symbols of digit and char";
        }

        return isValid;
    }

    onSubmit(event: Event) :void {
        event.preventDefault();
        if(!this.validatePassword(this.user)) {
            return;
        }

        let success;
        this.authService.login(this.user)
            .subscribe((result) => success = result);

        if(success) {
            console.log("logged sucessfully");
            this.router.navigate(['/profile']);
        } else {
            console.log("logged unsucessfully");
            this.errorMsg = "Logged unsuccessfully";
        }
    }


}
