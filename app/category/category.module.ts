import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {FacebookComponent} from "./facebook-category.component";
import {CommonModule} from "@angular/common";
import {CategoryService} from "./category.service";
import {VKComponent} from "./vk-category.component";
import {LoaderModule} from "../loader/loader.module";
@NgModule({
    imports: [
        LoaderModule,
        RouterModule.forChild([
            {
                path: 'category/facebook', component: FacebookComponent,
            },
            {
                path: 'category/vk', component: VKComponent,
            }
        ]),
        CommonModule
    ], declarations: [
        FacebookComponent, VKComponent
    ], providers: [CategoryService]
})
export class CategoryModule {


}