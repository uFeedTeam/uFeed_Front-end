import {NgModule} from "@angular/core";
import {EditComponent} from "./edit-user.component";
import {FormsModule} from "@angular/forms";
import {UserEditService} from "./user.edit.service";
@NgModule({
    imports: [FormsModule],
    declarations: [EditComponent],
    providers: [UserEditService]
})
export class UserModule {

}