import {Component} from "@angular/core";
import {UserAuthenticationService} from "../services/UserAuthenticationService";
import {UserCredentials} from "../model/UserCredentials";
import {Router} from "@angular/router";
@Component({
    selector: 'register',
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
            <div class="exit">
                <a routerLink="/"><img src="content/images/exit.png" class="exitLink"></a>
            </div>
            <div class="bodyForm">
                <form (submit)="onSubmit(user)">
                    <input required name="name" [(ngModel)]="user.Name" class="materialInput" placeholder="Login" type="text">
                    <br>
                    <input required name="email" [(ngModel)]="user.Email" class="materialInput" placeholder="Email" type="text">
                    <br>
                    <input required name="password" [(ngModel)]="user.Password" class="materialInput" placeholder="Password" type="password">
                    <br>
                    <input required name="comfirmPass" [(ngModel)]="user.ConfirmPassword" class="materialInput" placeholder="Confirm password" type="password">
                    <h3 *ngIf="errorMsg" style="color: black;">{{errorMsg}}</h3>

                    <input type="image" src="content/images/signUpR.png" class="submitButton">
                </form>
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
    `,
})
export class UserRegisterComponent {

    errorMsg: string = "";
    user: UserCredentials = new UserCredentials('', '', '', '');

    constructor(private authService: UserAuthenticationService,
    private router: Router) {
    }

    onSubmit(user: UserCredentials) {
        let success;
        this.authService.register(user)
            .subscribe((result) => {
                success = result;
            });
        if (success) {
            this.router.navigate(['/profile']);
        } else {
            this.errorMsg = "Cannot register. Check credentials";
            console.log('reg succesfully');
        }
    }
}