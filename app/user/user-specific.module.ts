import {NgModule} from "@angular/core";
import {EditComponent} from "./edit-user.component";
import {FormsModule} from "@angular/forms";
import {UserEditService} from "./user.service";
import {CommonModule} from "@angular/common";
@NgModule({
    imports: [
        FormsModule,
        CommonModule,
    ],
    declarations: [EditComponent],
    providers: [UserEditService]
})
export class UserModule {

}