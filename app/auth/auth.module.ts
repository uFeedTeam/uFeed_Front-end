import {NgModule} from "@angular/core";
import {IndexComponent} from "./index.component";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./login.component";
import {RegisterComponent} from "./register.component";
import {AuthComponent} from "../auth.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AuthService} from "./auth.service";
import {HttpModule} from "@angular/http";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HttpModule,
        RouterModule.forChild([
            {
                path: '',
                component: IndexComponent,
                children: [{
                    path: 'login',
                    component: LoginComponent
                }, {
                    path: 'register',
                    component: RegisterComponent
                }]
            }
        ])
    ],
    declarations: [
        IndexComponent,
        LoginComponent,
        RegisterComponent,
        AuthComponent],
    providers: [AuthService]
})
export class AuthModule {
}