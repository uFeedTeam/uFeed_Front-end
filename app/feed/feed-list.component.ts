import {Component, Input, OnInit, OnChanges, SimpleChanges} from "@angular/core";
import {FeedService} from "./feed.service";
import {AuthService} from "../auth/auth.service";
import {BookmarkService} from "./bookmark.service";
import {Markers} from "../social.markers";

@Component({
    moduleId: module.id,
    selector: 'feed-list',
    styleUrls: ['feedStyle.css'],
    templateUrl: 'post.template.html'
})
export class FeedListComponent implements OnInit, OnChanges {

    ngOnChanges(changes: SimpleChanges): void {
        this.loadFeed();
    }

    posts: any[] = [];
    @Input() categoryId: string;

    addToFavorites(source: number, postId, authorId) {
        if(source === +Markers.FACEBOOK) {
            console.log('Adding fb bookmark');
            this.bookmarkService.addBookmark(source, postId)
                .subscribe(ok => {});
        }
        if(source === +Markers.VK) {
            console.log('Adding vk bookmark');
            this.bookmarkService.addBookmarkVK(source, postId, authorId)
                .subscribe(ok => {});
        }
    }

    ngOnInit(): void {
        this.loadFeed();

        // setInterval(() => console.log(this.categoryId));
        this.feedService.getAuthors(this.authService.FBToken).subscribe(as => console.log(as));
    }

    loadFeed() {
        if (this.categoryId) {
            console.log('loading feed with id ' + this.categoryId);
            this.feedService.getFeed(this.categoryId, "1", "5")
                .subscribe(posts => {
                    this.posts = posts;
                });
        }
    }


    constructor(private feedService: FeedService, private authService: AuthService,
                private bookmarkService: BookmarkService) {

    }

}