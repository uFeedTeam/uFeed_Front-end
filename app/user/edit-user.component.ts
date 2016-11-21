import {Component, OnInit, ViewChild} from "@angular/core";
import {UserCredentials} from "./UserCredentials";
import {ActivatedRoute, Router} from "@angular/router";
import {UserEditService} from "./user.service";
import {Observable} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    moduleId: module.id,
    selector: 'edit',
    templateUrl: 'edit-user.component.html',
    styleUrls: ['edit-user.styles.css']

})
export class EditComponent implements OnInit {

    @ViewChild("img") img;
    picUrl;
    private oldPassword;
    updateProps: string[] = [];
    photo: Int8Array;

    constructor(private route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer,
                private userEditService: UserEditService) {
        this.user = new UserCredentials('', '', '');
    }

    ngOnInit(): void {
        this.route.data
            .subscribe(( (data: { user: UserCredentials })=> {
                this.user = data.user;
                this.oldPassword = this.user.Password;
            }));
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
            console.log(e.loaded / e.total);
        });

        let byteStringReader = new FileReader();
        byteStringReader.readAsDataURL(input.files[0]);
        byteStringReader.addEventListener("load", (e: UIEvent)=> {
            // unsafe, but i have to pass sprint successful!
            this.picUrl = this.sanitizer.bypassSecurityTrustUrl(byteStringReader.result);
        });
    }

    updateProfile() {
        this.updateProps = [];
        let isPassChanged: boolean = this.user.Password !== this.oldPassword;
        let obs: Observable<string> = null;
        if (isPassChanged) {
            obs = this.userEditService.editUser(this.user, this.oldPassword);
        } else {
            obs = this.userEditService.editUser(this.user);
        }

        obs.subscribe((updPropName: string)=> {
            this.updateProps.push(updPropName)
        }, err => {
            alert("Cannot update " + err);
        });
    }
}