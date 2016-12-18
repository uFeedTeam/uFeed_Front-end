import {Component, OnInit} from "@angular/core";
import {BookmarkService} from "./bookmark.service";
import {Markers} from "../social.markers";
@Component({
    moduleId: module.id,
    templateUrl: 'bookmarks.template.html'
})
export class BookmarkComponent implements OnInit {

    isLoading: boolean = false;

    ngOnInit(): void {
        this.isLoading = true;
        this.bookmarkService.getBookmarks()
            .subscribe(bookmarks => {
                console.log(bookmarks);
                this.posts = bookmarks;
                this.isLoading = false;
            });
    }

    posts: any[];

    constructor(private bookmarkService: BookmarkService) {
    }

    deleteBookmark(source: number, id, authorId) {
        if (source === +Markers.FACEBOOK) {
            this.bookmarkService.deleteBookmark(id).subscribe(ok => {
                console.log('deleted bookmark ' + id);
                this.posts = this.posts.filter(p => p.Id != id);
            });
        }
        if(source === +Markers.VK) {
            this.bookmarkService.deleteBookmarkVk(id, authorId).subscribe(ok => {
                console.log('deleted bookmark ' + id);
                this.posts = this.posts.filter(p => p.Id != id);
            });
        }
    }

}