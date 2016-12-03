import {Component, OnInit, ViewChild} from "@angular/core";
import {UserCredentials} from "./UserCredentials";
import {ActivatedRoute, Router} from "@angular/router";
import {UserEditService} from "./user.service";
import {Observable} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {AuthService} from "../auth/auth.service";

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
    photo: Int8Array;
    isFBConnected: boolean = false;
    FBToken: string = "";
    constructor(private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer,
                private userEditService: UserEditService, private authService: AuthService) {
        this.user = new UserCredentials('', '', '');
    }

    ngOnInit(): void {
        this.route.data
            .subscribe(( (data: { user: UserCredentials })=> {
                this.user = data.user;
                this.oldPassword = this.user.Password;
                this.isFBConnected = this.user.Logins.indexOf(1) !== -1;
                if (this.user.Photo) {
                    this.picUrl = this.sanitizer.bypassSecurityTrustUrl(this.user.Photo);
                }
            }));

        setInterval(() => {
            if (this.authService.isLogined) {
                var photo = this.authService.user.Photo;
                if (photo != null) {
                    this.picUrl = this.sanitizer.bypassSecurityTrustUrl(photo);
                }
            }
        }, 100);
    }

    user: UserCredentials;

    sendPicture() {
        this.userEditService.sendPic(this.photo)
            .subscribe(
                (resp: string)=> this.updateProps.push(resp),
                (err) => alert(err)
            );
    }

    deactivateAccount() {
        this.userEditService.deleteAccount()
            .subscribe(resp => this.router.navigate(["/"]), err => alert(err));
    }

    fileChange(input): void {

        let reader = new FileReader();
        reader.addEventListener("load", (event: UIEvent) => {
            this.photo = new Int8Array(reader.result);
        }, false);
        reader.readAsArrayBuffer(input.files[0]);
        reader.addEventListener("progress", (e: ProgressEvent) => {
        });

        let byteStringReader = new FileReader();
        byteStringReader.readAsDataURL(input.files[0]);
        byteStringReader.addEventListener("load", (e: UIEvent)=> {
            // unsafe, but i have to pass sprint successful!
            this.picUrl = this.sanitizer.bypassSecurityTrustUrl(byteStringReader.result);
            this.authService.user.Photo = byteStringReader.result;
        });
    }

    activateFB() {
        this.userEditService.activateSocials(1)
            .subscribe(good => {
                alert('Facebook has been added properly');
                this.isFBConnected = true;
                this.authService.FBToken = this.FBToken;
            }, bar => alert('Facebook has not been added properly'));
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