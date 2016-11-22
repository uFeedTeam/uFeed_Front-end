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

    ngOnInit(): void {
        this.route.data
            .subscribe(( (data: { user: UserCredentials })=> {
                this.user = data.user;
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

    constructor(private route: ActivatedRoute, private authService: AuthService, private sanitizer: DomSanitizer) {
    }

    user: UserCredentials;

}