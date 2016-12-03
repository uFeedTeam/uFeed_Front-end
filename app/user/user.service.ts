import {Injectable} from "@angular/core";
import {Http, Response, Headers} from "@angular/http";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {UserCredentials} from "./UserCredentials";

@Injectable()
export class UserEditService {

    private GET_FULL_INFO_URL: string = "http://ufeed.azurewebsites.net/api/user/get";
    private DELETE_URL: string = "http://ufeed.azurewebsites.net/api/account/delete";
    private UPDATE_USR_LOGIN_URL: string = "http://ufeed.azurewebsites.net/api/user/newname";
    private CHANGE_PASS_URL = "http://ufeed.azurewebsites.net/api/Account/ChangePassword";
    private SEND_PIC = "http://ufeed.azurewebsites.net/api/user/newphoto";
    private ADD_SOC = "http://ufeed.azurewebsites.net/api/user/addLogin";

    constructor(private http: Http, private router: Router, private authService: AuthService) {
    }

    activateSocials(socialNum: number): Observable<boolean> {
        let headers = new Headers();
        headers.append("Authorization", this.authService.AuthHeader.get("Authorization"));
        headers.append('Content-type', 'application/json');
        return this.http.post(this.ADD_SOC, socialNum, {headers: headers})
            .map(resp => true);
    }

    getFullUserInfo(): Observable<UserCredentials> {
        if (!this.authService.isLogined) {
            return null;
        }
        return this.http.get(this.GET_FULL_INFO_URL, {headers: this.authService.AuthHeader})
            .map((resp: Response) => {
                var json = resp.json();
                let usr: UserCredentials = new UserCredentials(json.Name, json.Email, this.authService.user.Password,
                    json.UserId, json.Categories, json.Logins, json.Photo);
                return usr;
            });
    }

    sendPic(bytes: Int8Array): Observable<string> {
        let nums = [];
        let headers: Headers;
        headers = new Headers();
        headers.append("Content-type", "application/x-www-form-urlencoded");
        headers.append("Authorization", this.authService.AuthHeader.get("Authorization"));
        bytes.forEach(b => nums.push(b));
        return this.http.put(this.SEND_PIC, JSON.stringify(nums), {headers: headers})
            .map(resp => 'picture');
    }

    deleteAccount(): Observable<boolean> {
        return this.http.post(this.DELETE_URL, {}, {headers: this.authService.AuthHeader})
            .map(resp => true)
            .catch(resp => {
                return Observable.throw("Cannot delete account")
            });
    }


    editUser(user: UserCredentials, oldPass: string): Observable<string> {
        let subj = new Subject<string>();

        var headers = new Headers();
        headers.append("Authorization",this.authService.AuthHeader.get("Authorization"));
        headers.append("Content-type", "application/json");

        this.http.put(this.UPDATE_USR_LOGIN_URL, user,
            {headers: headers})
            .subscribe(resp => subj.next('user name'));

        this.http.post(this.CHANGE_PASS_URL,
            {OldPassword: oldPass, NewPassword: user.Password, ConfirmPassword: user.Password},
            {headers: headers})
            .subscribe(resp => subj.next('password'));

        return subj.asObservable();

    }

}
