import {Component, Input, OnInit, OnChanges, SimpleChanges} from "@angular/core";
import {FeedService} from "./feed.service";
import {AuthService} from "../auth/auth.service";
import {BookmarkService} from "./bookmark.service";
import {Markers} from "../social.markers";

@Component({
    moduleId: module.id,
    selector: 'feed-list',
    styleUrls: ['feedStyle.css'],
    templateUrl: 'post.template.html',
})
export class FeedListComponent implements OnInit, OnChanges {

    ngOnChanges(changes: SimpleChanges): void {
        this.loadFeed();
    }

    posts: any[] = [];
    @Input() categoryId: string;
    loadingPosts: boolean = false;

    addToFavorites(source: number, postId, authorId) {
        if (source === +Markers.FACEBOOK) {
            console.log('Adding fb bookmark');
            this.bookmarkService.addBookmark(source, postId)
                .subscribe(ok => {
                });
        }
        if (source === +Markers.VK) {
            console.log('Adding vk bookmark');
            this.bookmarkService.addBookmarkVK(source, postId, authorId)
                .subscribe(ok => {
                });
        }
    }

    ngOnInit(): void {
        this.loadFeed();
    }

    loadFeed() {
        this.loadingPosts = true;
        this.posts = [];
        if (this.categoryId) {
            console.log('loading feed with id ' + this.categoryId);
            this.feedService.getFeed(this.categoryId, "1", "5")
                .subscribe(posts => {
                    this.posts = posts;
                    this.posts.sort((a, b) => .5 - Math.random());
                    this.loadingPosts = false;
                    console.log('got feed');
                }, err => this.loadingPosts = false);
        } else {
            this.loadingPosts = false;
        }
    }

    constructor(private feedService: FeedService, private authService: AuthService,
                private bookmarkService: BookmarkService) {

    }

}