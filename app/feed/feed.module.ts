import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FeedComponent} from "./feed.component";
@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'feed',
                component: FeedComponent,
            }
        ])
    ],
    declarations: [FeedComponent]
})
export class FeedModule {

}