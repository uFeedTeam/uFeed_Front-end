import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {UserCredentials} from "./UserCredentials";

@Injectable()
export class UserEditService {

    private GET_FULL_INFO: string = "http://localhost:3995/api/user/get";
    private DELETE_URL: string = "http://localhost:3995/api/account/delete";

    constructor(private http: Http, private router: Router, private authService: AuthService) {
    }

    getFullUserInfo(): Observable<UserCredentials> {
        if (!this.authService.isLogined) {
            return null;
        }
        return this.http.get(this.GET_FULL_INFO, {headers: this.authService.AuthHeader})
            .map((resp: Response) => {
                var json = resp.json();
                let usr: UserCredentials = new UserCredentials(json.Name, json.Email, "",
                    json.Id, json.Categories, json.Photo);
                return usr;
            });
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