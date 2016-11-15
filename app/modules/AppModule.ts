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

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
            {path: '', component: IndexComponent},
            {path: 'login', component: UserLoginComponent},
            {path: 'register', component: UserRegisterComponent}
        ])],
    declarations:
        [AppComponent, HeaderComponent, IndexComponent,
        UserLoginComponent, UserRegisterComponent],
    providers: [UserAuthenticationService],
    bootstrap: [AppComponent]
})
export class AppModule {
}