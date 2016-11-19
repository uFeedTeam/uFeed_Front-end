import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthComponent} from "./auth.component";

let ROUTES: Routes = [
    {
        path: '', component: AuthComponent
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