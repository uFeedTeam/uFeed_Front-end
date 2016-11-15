import {Component} from "@angular/core";
import {UserAuthenticationService} from "../services/UserAuthenticationService";
import {Router} from "@angular/router";
import {Response} from "@angular/http";
@Component({
    template: `
        <div class="location">
            <h3 class="locationText">Account Settings</h3>
        </div>
        <div class="">
            <div class="mainInfo">
                <div class="profilePhoto">
                    <img src="content/images/person.png" class="mainPhoto">
                    <br>
                    <div class="qwe">
                        <a href="#" class="photoLink"><h5><img src="content/images/download_icon.png" class="uploadPhoto"> Upload photo</h5></a>
                    </div>
                </div>
                <div class="data">
                    <div class="inputLabel">
                            <h5>Login</h5>
                    </div>
                    <div class="input-field">
                        <input name="login" type="text" >
                    </div>
                    <br>
                    <div class="inputLabel">
                            <h5>Email</h5>
                    </div>
                    <div class=" input-field">
                        <input name="email" type="text" >
                    </div>
                    <br>
                    <div class="passwordInputLabel">
                            <h5>Password</h5>
                    </div>
                    <div class="input-field">
                        <input name="password" type="text" >
                    </div>
                    <br>
                </div>
            </div>
            <div class="socials">
                <div>
                    <h5>Social networks </h5>
                </div>
                <div class="socialUl">
                <ul>
                <p><input type="checkbox" id="Fb" />
                  <label for="Fb"><img src="content/images/fb_logo.png" class="ulImage">Facebook</label> <a href="#" class="ulLink">Manage network</a></p>

                  <p><input type="checkbox" id="Vk" />
                  <label for="Vk"><img src="content/images/vk_logo.png" class="ulImage">Vkontakte</label> <a href="#" class="ulLink">Manage network</a></p>
                    
                  <p><a href="#"><img src="content/images/add_icon.png" class="addNewSocial">Add network</a></p>
                </ul>
                </div>
                <br>
                <div class="deactivate">
                    <a (click)="deleteAccount()"><h5><u>Deactivate account</u></h5></a>
                </div>
                <br>
                <div class="controlPanel">
                    <a href="#"><img src="content/images/cancel.png" class="controlLink"></a>
                    <a href="#"><img src="content/images/save.png" class="controlLink"></a>
                </div>
            </div>
        </div>
`
})
export class ProfileComponent {

    constructor(private authService: UserAuthenticationService, private router: Router)
    {}

    deleteAccount() {
        let result: boolean;
        this.authService.deleteAcc()
            .subscribe((resp: boolean) => {
                console.log("--> " + resp);
                result = resp;
            });

        if(result) {
            this.router.navigate(['/']);
        }
    }
}