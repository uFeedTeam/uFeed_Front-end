import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {UserCredentials} from "../user/UserCredentials";
import {AuthService} from "../auth/auth.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    moduleId: module.id,
    styleUrls: ['feedStyle.css'],
    selector: 'feed',
    templateUrl: 'feed.template.html'
})
export class FeedComponent implements OnInit {

    picUrl;
    selectedCategory;
    user: UserCredentials;

    ngOnInit(): void {
        this.route.data
            .subscribe(( (data: { user: UserCredentials })=> {
                this.user = data.user;
            }));
        this.selectedCategory = this.user.Categories[0];
    }

    changeSelectedCategory(category) {
        this.selectedCategory = category;

    }

    constructor(private route: ActivatedRoute, private authService: AuthService, private sanitizer: DomSanitizer) {
    }


}