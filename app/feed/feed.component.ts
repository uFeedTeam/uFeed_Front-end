import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {UserCredentials} from "../user/UserCredentials";
@Component({
    moduleId: module.id,
    styleUrls: ['feedStyle.css'],
    selector: 'feed',
    templateUrl: 'feed.template.html'
})
export class FeedComponent implements OnInit {
    ngOnInit(): void {
        this.route.data
            .subscribe(( (data: { user: UserCredentials })=> {
                this.user = data.user;
                alert(JSON.stringify(this.user));
            }));
    }

    constructor(private route: ActivatedRoute) {
    }

    user: UserCredentials;

}