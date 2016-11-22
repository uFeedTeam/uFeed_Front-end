import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FeedComponent} from "./feed.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
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