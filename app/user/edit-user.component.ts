import {Component, OnInit, ViewChild} from "@angular/core";
import {UserCredentials} from "./UserCredentials";
import {ActivatedRoute, Router} from "@angular/router";
import {UserEditService} from "./user.service";
import {Observable} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {AuthService} from "../auth/auth.service";
import {Markers} from "../social.markers";

@Component({
    moduleId: module.id,
    selector: 'edit',
    templateUrl: 'edit-user.component.html',
    styleUrls: ['edit-user.styles.css'],

})
export class EditComponent implements OnInit {

    @ViewChild("img") img;
    picUrl;
    private oldPassword;
    updateProps: string[] = [];
    isFBConnected: boolean = false;
    isVKConnected: boolean = false;
    FBToken: string = "";
    VKToken: string = "";
    VKUserId: string = "";

    constructor(private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer,
                private userEditService: UserEditService, private authService: AuthService) {
        this.user = new UserCredentials('', '', '');
    }

    ngOnInit(): void {
        this.route.data
            .subscribe(( (data: { user: UserCredentials })=> {
                this.user = data.user;
                this.oldPassword = this.user.Password;
                this.isFBConnected = this.user.Logins.indexOf(+Markers.FACEBOOK) !== -1;
                this.isVKConnected = this.user.Logins.indexOf(+Markers.VK) !== -1;
                if (this.user.Photo) {
                    this.picUrl = this.sanitizer.bypassSecurityTrustUrl(this.user.Photo);
                }
            }));

        // let stop = setInterval(() => {
        //     if (this.authService.isLogined) {
        //         var photo = this.authService.user.Photo;
        //         if (photo != null) {
        //             this.picUrl = this.sanitizer.bypassSecurityTrustUrl(photo);
        //             clearInterval(stop);
        //         }
        //     }
        // }, 100);
    }

    user: UserCredentials;

    sendPicture() {
        console.log('sending a pic');

    }

    deactivateAccount() {
        this.userEditService.deleteAccount()
            .subscribe(resp => this.router.navigate(["/"]), err => alert(err));
    }

    fileChange(input): void {
        let byteStringReader = new FileReader();
        byteStringReader.readAsDataURL(input.files[0]);
        byteStringReader.addEventListener("load", (e: UIEvent)=> {
            // unsafe, but i have to pass sprint successful!
            this.picUrl = this.sanitizer.bypassSecurityTrustUrl(byteStringReader.result);
            this.authService.user.Photo = byteStringReader.result;
            this.userEditService.sendPic(this.picUrl)
                .subscribe(
                    (resp: string)=> this.updateProps.push(resp),
                    (err) => alert(err)
                );
        });
    }

    activateFB() {
        this.userEditService.activateSocials(+Markers.FACEBOOK)
            .subscribe(good => {
                alert('Facebook has been added properly');
                this.isFBConnected = true;
                this.authService.FBToken = this.FBToken;
            }, bar => alert('Facebook has not been added properly'));
    }

    activateVK() {
        this.userEditService.activateSocials(+Markers.VK)
            .subscribe(good => {
                alert('VK has been added properly');
                this.isVKConnected = true;
                this.authService.VKToken = this.VKToken;
                this.authService.VKUserID = this.VKUserId;
            }, bar => alert('VK has not been added properly'));
    }

    updateProfile() {
        this.updateProps = [];
        let obs: Observable<string> = null;
        obs = this.userEditService.editUser(this.user, this.oldPassword);

        obs.subscribe((updPropName: string)=> {
            this.updateProps.push(updPropName)
        }, err => {
            alert("Cannot update " + err);
        });
    }
}