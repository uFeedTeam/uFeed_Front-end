import {Component, OnInit} from "@angular/core";
import {BookmarkService} from "./bookmark.service";
@Component({
    moduleId: module.id,
    templateUrl: 'bookmarks.template.html'
})
export class BookmarkComponent implements OnInit{

    ngOnInit(): void {
        this.bookmarkService.getBookmarks()
            .subscribe(bookmarks => {
                console.log(bookmarks);
             this.posts = bookmarks});
    }

    posts: any[];

    constructor(private bookmarkService: BookmarkService) {}

    deleteBookmark(id) {
        this.bookmarkService.deleteBookmark(id).subscribe(ok => {
            console.log('deleted bookmark ' + id);
        });
    }

}