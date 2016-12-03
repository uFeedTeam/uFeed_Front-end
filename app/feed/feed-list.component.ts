import {Component, Input, OnInit, OnChanges, SimpleChanges} from "@angular/core";
import {FeedService} from "./feed.service";
import {AuthService} from  "../auth/auth.service";
import {loadavg} from "os";

@Component({
    moduleId: module.id,
    selector: 'feed-list',
    stylesUrls: ['feedStyle.css'],
    templateUrl: 'post.template.html'
})
export class FeedListComponent implements OnInit, OnChanges {

    ngOnChanges(changes: SimpleChanges): void {
        this.loadFeed();
    }

    posts: any[] = [];
    @Input() categoryId: string;


    ngOnInit(): void {
        this.loadFeed();

        // setInterval(() => console.log(this.categoryId));
        this.feedService.getAuthors(this.authService.FBToken).subscribe(as => console.log(as));
    }

    loadFeed() {
        console.log('loading feed with id ' + this.categoryId);
        this.feedService.getFeed(this.categoryId, "1", "5")
            .subscribe(posts => {
                this.posts = posts;
            });
    }


    constructor(private feedService: FeedService, private authService: AuthService) {

    }

}