import {Component} from "@angular/core";
import {FeedService} from "./feed.service";
import {AuthService} from  "../auth/auth.service";

@Component({
    moduleId: module.id,
    selector: 'feed-list',
    stylesUrls: ['feedStyle.css'],
    templateUrl: 'post.template.html'
})
export class FeedListComponent {
    posts: any[] = [];

    constructor(private feedService: FeedService, private authService: AuthService) {
        feedService.getFeed()
            .subscribe(posts => {
                this.posts = posts;
            });

        console.log("with fb token " + this.authService.FBToken);
        this.feedService.getAuthors(this.authService.FBToken).subscribe(as => console.log(as));
    }

}