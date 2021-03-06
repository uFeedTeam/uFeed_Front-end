import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FeedComponent} from "./feed.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {UserAuthResolveGuard} from "../auth/user-resolve-guard.service";
import {AuthGuard} from "../auth/auth-guard.service";
import {FeedListComponent} from "./feed-list.component";
import {FeedService} from "./feed.service";
import {BookmarkComponent} from "./bookmarks.component";
import {BookmarkService} from "./bookmark.service";
import {LoaderModule} from "../loader/loader.module";
import { TruncatePipe } from 'angular2-truncate';

@NgModule({
    imports: [
        CommonModule,
        LoaderModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: 'bookmarks',
                component: BookmarkComponent, canActivate: [AuthGuard]
            },
            {
                path: 'feed',
                component: FeedComponent, resolve: {user: UserAuthResolveGuard}, canActivate: [AuthGuard],
            }
        ])
    ],
    declarations: [FeedComponent, FeedListComponent, BookmarkComponent, TruncatePipe],
    providers: [FeedService, BookmarkService],
})
export class FeedModule {

}