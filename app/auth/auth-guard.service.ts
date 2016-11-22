import {Injectable} from "@angular/core";
import {CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router} from "@angular/router";
import {AuthService} from "./auth.service";
/**
 * Created by Vlad on 20.11.2016.
 */

@Injectable()
export class AuthGuard implements CanActivate {


    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        let logined = this.authService.isLogined;
        if (!logined) {
            this.router.navigate(['/login']);
        }
        return logined;
    }

}