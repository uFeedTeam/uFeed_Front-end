import {Injectable} from "@angular/core";
import {UserCredentials} from "../model/UserCredentials";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class UserAuthenticationService {

    private static registrationUrl: string = "api/account/register";
    private static loginUrl: string = "/token";
    private static TOKEN_KEY: string = 'tokenJson';

    constructor(private http: Http) {
    }

    register(user: UserCredentials): Observable<boolean> {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(UserAuthenticationService.registrationUrl,
            JSON.stringify(user), headers)
            .map((resp: Response) => {
                return resp.ok;
            });
    }

    logout(): void {
        localStorage.removeItem(UserAuthenticationService.TOKEN_KEY);
    }

    login(user: UserCredentials): Observable<boolean> {
        let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let body: string = `grant_type=password&username=${user.email}&password=${user.password}}`;
        return this.http.post(UserAuthenticationService.loginUrl, body, headers)
            .map((resp: Response) => {
                if (!resp.ok) {
                    return false;
                } else {
                    let tokenJson = resp.json() && resp.json();
                    if (tokenJson) {
                        localStorage.setItem(UserAuthenticationService.TOKEN_KEY, tokenJson);
                    } else {
                        return false;
                    }
                }
            });
    }
}
