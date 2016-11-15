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
                        <a href="#"><img src="content/images/exit.png" class="exitLink"></a>
                    </div>
                    <div class="bodyForm">
                        <form #form="ngForm" (submit)="onSubmit($event)">
                            <input required  class="materialInput" [(ngModel)]="user.name" name="login" placeholder="Login" type="text">
                            <br>
                            <input required class="materialInput" [(ngModel)]="user.password" name="password" placeholder="Password" type="password">
                            <h3 *ngIf="errorMsg" style="color: black">{{errorMsg}}</h3>
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

    onSubmit(event: Event) {
        event.preventDefault();
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
