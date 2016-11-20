import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {UserCredentials} from "../user/UserCredentials";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class UserAuthResolveGuard implements Resolve<UserCredentials> {

    constructor(private authService: AuthService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserCredentials>|Promise<UserCredentials>|any {
        let logined: boolean = this.authService.isLogined;
        if (!logined) {
            return false;
        }

        return this.authService.user;
    }

}