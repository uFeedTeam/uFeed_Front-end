import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FeedComponent} from "./feed.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {UserAuthResolveGuard} from "../auth/user-resolve-guard.service";
import {AuthGuard} from "../auth/auth-guard.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: 'feed',
                component: FeedComponent, resolve: {user: UserAuthResolveGuard} , canActivate: [AuthGuard]
            }
        ])
    ],
    declarations: [FeedComponent]
})
export class FeedModule {

}