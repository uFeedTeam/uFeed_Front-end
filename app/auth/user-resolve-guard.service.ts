import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {UserCredentials} from "../user/UserCredentials";
import {Observable} from "rxjs";
import {UserEditService} from "../user/user.service";

@Injectable()
export class UserAuthResolveGuard implements Resolve<UserCredentials> {

    constructor(private userService: UserEditService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserCredentials>|Promise<UserCredentials>|any {
        let fullUserInfo = this.userService.getFullUserInfo();
        if (fullUserInfo === null) {
            return false;
        }

        return fullUserInfo;
    }

}