import {NgModule} from "@angular/core";
import {IndexComponent} from "./index.component";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./login.component";
import {RegisterComponent} from "./register.component";
import {AuthComponent} from "../auth.component";

@NgModule({
    imports: [
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
        AuthComponent]
})
export class AuthModule {
}