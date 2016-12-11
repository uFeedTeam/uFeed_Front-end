import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import {UserCredentials} from "../user/UserCredentials";
import {Markers} from "../social.markers";


@Injectable()
export class AuthService {

    private LOGIN_URL = "http://localhost:3995/token";
    private REGISTER_URL: string = "http://localhost:3995/api/account/register";

    private isLoggedIn: boolean = false;
    private authHeader: Headers = new Headers();

    public FBToken: string;

    constructor(private http: Http) {
    }

    public generateAuthenticatedHeaders(): Headers {
        let headers = new Headers();
        headers.set('Content-type', 'application/json');
        headers.set('Authorization', `${this.authHeader.get("Authorization")}`);
        return headers;
    }

    public get AuthHeader() {
        return this.authHeader;
    }

    public get isLogined() {
        return this.isLoggedIn;
    }

    public user: UserCredentials;

    logout() {
        this.isLoggedIn = false;
    }

    login(user: UserCredentials): Observable<UserCredentials> {
        let body = `grant_type=password&username=${user.Email}&password=${user.Password}`;

        var headers = new Headers();
        headers.set("Content-Type", "application/x-www-form-urlencoded");

        return this.http.post(this.LOGIN_URL, body, {headers: headers})
            .map((resp: Response) => {
                let tokenJson = resp.json();
                localStorage.setItem("token", tokenJson);
                this.isLoggedIn = true;
                this.user = user;
                console.log(tokenJson);
                this.authHeader.set("Authorization", "Bearer " + tokenJson.access_token);

                let heads = new Headers();
                heads.append("Content-type", "application/json");
                heads.append("Authorization", "Bearer " + tokenJson.access_token);

                // register vk and FB
                this.http.post('http://localhost:3995/api/user/addlogin', Markers.FACEBOOK, {headers: heads})
                    .subscribe((ok) => {});
                this.http.post('http://localhost:3995/api/user/addLogin', Markers.VK, {headers: heads})
                    .subscribe((ok) => {});
                return user;
            }).catch((resp: Response) => Observable.throw(resp.json().error_description));
    }

    register(user: UserCredentials): Observable<UserCredentials> {
        let body = {
            Email: user.Email,
            Name: user.Name,
            Password: user.Password,
            ConfirmPassword: user.Password
        };

        var headers = new Headers();
        headers.set("Content-Type", "application/json");
        return this.http.post(this.REGISTER_URL, body, {headers: headers})
            .map((resp: Response) => true)
            .catch((err: Response | any) => Observable.throw(err.json().ModelState[""]
                || "Cannot register: internal error"));
    }

    getUserInfo(): Observable<UserCredentials> {
        var headers = this.generateAuthenticatedHeaders();
        return this.http.get("http://localhost:3995/api/user/get",
            { headers: headers })
            .map((resp: Response) => {
                let responseJson: any = resp.json();
                return new UserCredentials(
                    responseJson.Name,
                    responseJson.Email,
                    null,
                    responseJson.UserId,
                    responseJson.Categories,
                    responseJson.Logins,
                    responseJson.Photo
                );
            });
    }
}