import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FacebookComponent} from "./facebook-category.component";
import {CommonModule} from "@angular/common";
import {CategoryService} from "./category.service";
@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'category/facebook', component: FacebookComponent,
            }
        ]),
        CommonModule
    ], declarations: [
        FacebookComponent
    ], providers: [CategoryService]
})
export class CategoryModule {


}