import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import {UserCredentials} from "../user/UserCredentials";


@Injectable()
export class AuthService {

    private LOGIN_URL = "http://localhost:3995/token";
    private REGISTER_URL: string = "http://localhost:3995/api/account/register";

    private isLoggedIn: boolean = false;

    constructor(private http: Http) {
    };

    public get isLogined() {
        return this.isLoggedIn;
    }

    public user: UserCredentials;

    login(user: UserCredentials): Observable<UserCredentials> {
        let body = `grant_type=password&username=${user.email}&password=${user.password}`;

        var headers = new Headers();
        headers.set("Content-Type", "application/x-www-form-urlencoded");

        return this.http.post(this.LOGIN_URL, body, {headers: headers})
            .map((resp: Response) => {
                localStorage.setItem("token", resp.json());
                this.isLoggedIn = true;
                this.user = user;
                return user;
            }).catch((resp: Response) => Observable.throw(resp.json().error_description));
    }

    register(user: UserCredentials): Observable<UserCredentials> {
        let body = {
            Email: user.email,
            Name: user.name,
            Password: user.password,
            ConfirmPassword: user.password
        };

        var headers = new Headers();
        headers.set("Content-Type", "application/json");
        return this.http.post(this.REGISTER_URL, body, {headers: headers})
            .map((resp: Response) => true)
            .catch((err: Response | any) => Observable.throw(err.json().ModelState[""]
                || "Cannot register: internal error"));
    }

}