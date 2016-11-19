import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "./app-routing.module";
import {HeadComponent} from "./head.component";
import {AuthModule} from "./auth/auth.module";
import {UserModule} from "./user/user-specific.module";

@NgModule({
    imports: [
        UserModule,
        ReactiveFormsModule,
        BrowserModule,
        FormsModule,
        AuthModule,
        AppRoutingModule],

    declarations: [AppComponent, HeadComponent],
    bootstrap: [AppComponent],
    providers: []
})
export class AppModule {
}