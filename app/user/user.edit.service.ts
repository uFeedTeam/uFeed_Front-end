import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable()
export class UserEditService {

    private DELETE_URL: string = "http://localhost:3995/api/account/delete";

    constructor(private http: Http, private router: Router, private authService: AuthService) {
    }

    deleteAccount(): Observable<boolean> {
        return this.http.post(this.DELETE_URL, {}, {headers: this.authService.AuthHeader})
            .map(resp => true)
            .catch(resp => {
                console.log(resp);
                return Observable.throw("Cannot delete account")
            });
    }

    editUser() {

    }
}