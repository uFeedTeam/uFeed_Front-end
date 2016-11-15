import {NgModule} from "@angular/core";
import {UserAuthenticationService} from "../services/UserAuthenticationService";
import {AppComponent} from "../components/AppComponent";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {UserLoginComponent} from "../components/UserLoginComponent";
import "rxjs/Rx";
import {UserRegisterComponent} from "../components/UserRegisterComponent";
import {RouterModule} from "@angular/router";

import {IndexComponent} from "../components/IndexComponent";
import {HeaderComponent} from "../components/HeaderComponent";
import {ProfileComponent} from "../components/ProfileComponent";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
            {path: '', component: IndexComponent},
            {path: 'login', component: UserLoginComponent},
            {path: 'register', component: UserRegisterComponent},
            {path: 'profile', component: ProfileComponent}
        ])],
    declarations:
        [AppComponent, HeaderComponent, IndexComponent, ProfileComponent,
        UserLoginComponent, UserRegisterComponent],
    providers: [UserAuthenticationService],
    bootstrap: [AppComponent]
})
export class AppModule {
}