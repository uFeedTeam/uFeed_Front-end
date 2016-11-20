import {Component, OnInit} from "@angular/core";
import {UserCredentials} from "./UserCredentials";
import {ActivatedRoute, Router} from "@angular/router";
import {UserEditService} from "./user.edit.service";

@Component({
    moduleId: module.id,
    selector: 'edit',
    templateUrl: 'edit-user.component.html',
    styleUrls: ['edit-user.styles.css']

})
export class EditComponent implements OnInit {

    constructor(private route: ActivatedRoute, private router: Router, private userEditService: UserEditService) {
        this.user = new UserCredentials('', '', '');
    }

    ngOnInit(): void {
        this.route.data
            .subscribe(( (data: { user: UserCredentials })=> {
                this.user = data.user;
            }));
    }

    user: UserCredentials;

    deactivateAccount() {
        this.userEditService.deleteAccount()
            .subscribe(resp => this.router.navigate(["/"]), err => alert(err));
    }

}