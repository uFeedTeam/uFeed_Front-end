import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {HeadComponent} from "./head.component";
import {AuthModule} from "./auth/auth.module";
import {UserModule} from "./user/user-specific.module";
import {AuthService} from "./auth/auth.service";
import {CommonModule} from "@angular/common";
import {FeedModule} from "./feed/feed.module";
import {CategoryModule} from "./category/category.module";
import {LoaderComponent} from "./loader/loader.component";
import {LoaderModule} from "./loader/loader.module";

@NgModule({
    imports: [
        UserModule,
        CommonModule,
        ReactiveFormsModule,
        BrowserModule,
        FormsModule,
        FeedModule,
        AuthModule,
        CategoryModule, AppRoutingModule],
    declarations: [AppComponent, HeadComponent  ],
    bootstrap: [AppComponent],
    providers: [AuthService],
})
export class AppModule {
}