import {Component, OnInit} from "@angular/core";
import {UserCredentials} from "./UserCredentials";
import {ActivatedRoute, Router} from "@angular/router";
import {UserEditService} from "./user.service";
import {Observable} from "rxjs";

@Component({
    moduleId: module.id,
    selector: 'edit',
    templateUrl: 'edit-user.component.html',
    styleUrls: ['edit-user.styles.css']

})
export class EditComponent implements OnInit {

    private oldPassword;
    updateProps: string[] = [];

    constructor(private route: ActivatedRoute, private router: Router, private userEditService: UserEditService) {
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

    deactivateAccount() {
        this.userEditService.deleteAccount()
            .subscribe(resp => this.router.navigate(["/"]), err => alert(err));
    }

    updatePhoto() {

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