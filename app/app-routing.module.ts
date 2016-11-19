import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "./auth.component";
import {EditComponent} from "./user/edit-user.component";

let ROUTES: Routes = [
    {
        path: '', component: AuthComponent
    }, {
        path: 'edit', component: EditComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}