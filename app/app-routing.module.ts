import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "./auth.component";
import {EditComponent} from "./user/edit-user.component";
import {AuthGuard} from "./auth/auth-guard.service";
import {UserAuthResolveGuard} from "./auth/user-resolve-guard.service";

let ROUTES: Routes = [
    {
        path: '', component: AuthComponent
    }, {
        path: 'edit', component: EditComponent, canActivate: [AuthGuard],
        resolve: {user: UserAuthResolveGuard}
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES)
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {
}