import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {UserCredentials} from "./UserCredentials";

@Injectable()
export class UserEditService {

    private GET_FULL_INFO_URL: string = "http://localhost:3995/api/user/get";
    private DELETE_URL: string = "http://localhost:3995/api/account/delete";
    private UPDATE_USR_LOGIN_URL: string = "http://localhost:3995/api/user/newname";
    private CHANGE_PASS_URL = "http://localhost:3995/api/Account/ChangePassword";
    private SEND_PIC = "http://localhost:3995/api/user/newphoto";

    constructor(private http: Http, private router: Router, private authService: AuthService) {
    }

    getFullUserInfo(): Observable<UserCredentials> {
        if (!this.authService.isLogined) {
            return null;
        }
        return this.http.get(this.GET_FULL_INFO_URL, {headers: this.authService.AuthHeader})
            .map((resp: Response) => {
                var json = resp.json();
                let usr: UserCredentials = new UserCredentials(json.Name, json.Email, this.authService.user.Password,
                    json.Id, json.Categories, json.Photo);
                return usr;
            });
    }

    sendPic(bytes: Int8Array): Observable<string> {
        let nums = [];
        bytes.forEach(b => nums.push(b));
        return this.http.put(this.SEND_PIC, nums, {headers: this.authService.AuthHeader})
            .map(resp => 'picture');
    }

    deleteAccount(): Observable<boolean> {
        return this.http.post(this.DELETE_URL, {}, {headers: this.authService.AuthHeader})
            .map(resp => true)
            .catch(resp => {
                console.log(resp);
                return Observable.throw("Cannot delete account")
            });
    }


    editUser(user: UserCredentials, oldPass?: string): Observable<string> {
        let nameUpd: Observable<string> = this.http.put(this.UPDATE_USR_LOGIN_URL, user,
            {headers: this.authService.AuthHeader})
            .map(resp => 'user name');

        if (oldPass !== null) {
            let passUpd: Observable<string> = this.http.post(this.CHANGE_PASS_URL,
                {OldPassword: oldPass, NewPassword: user.Password, ConfirmPassword: user.Password},
                {headers: this.authService.AuthHeader})
                .map(resp => 'password');

            return Observable.merge(nameUpd, passUpd)
                .catch(resp => resp);

        } else {
            return nameUpd;
        }

    }
}