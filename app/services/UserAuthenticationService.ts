import {Injectable} from "@angular/core";
import {UserCredentials} from "../model/UserCredentials";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class UserAuthenticationService {

    public static registrationUrl: string = "api/account/register";
    public static loginUrl: string = "/token";
    public static deleteAccUrl: string = "api/account/delete";
    private static TOKEN_KEY: string = 'tokenJson';

    private logined: boolean;

    constructor(private http: Http) {
    }

    get isLogined() {
        return this.logined;
    }

    deleteAcc(): Observable<boolean> {
        let headers = new Headers({'Authorization': 'Bearer ' + this.getToken()});
        this.logout();
        let body: string = '';
        return this.http.post(UserAuthenticationService.loginUrl, body, headers)
            .map((resp: Response) => {
                return resp.ok;
        });
    }

    register(user: UserCredentials): Observable<boolean> {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(UserAuthenticationService.registrationUrl,
            JSON.stringify(user), headers)
            .map((resp: Response) => {
                return resp.ok;
            });
    }

    getToken(): string {
        return localStorage.getItem(UserAuthenticationService.TOKEN_KEY);
    }

    logout(): void {
        this.logined = false;
        localStorage.removeItem(UserAuthenticationService.TOKEN_KEY);
    }

    login(user: UserCredentials): Observable<boolean> {
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let body: string = `grant_type=password&username=${user.Email}&password=${user.Password}}`;
        return this.http.post(UserAuthenticationService.loginUrl, body, headers)
            .map((resp: Response) => {
                if (!resp.ok) {
                    return false;
                } else {
                    let tokenJson = resp.json() && resp.json();
                    if (tokenJson) {
                        localStorage.setItem(UserAuthenticationService.TOKEN_KEY, tokenJson);
                        this.logined = true;
                    } else {
                        return false;
                    }
                }
            });
    }
}
