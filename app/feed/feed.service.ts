import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {AuthService} from "../auth/auth.service";
@Injectable()
export class FeedService {

    private FEED_URL: string = "/app/feed/feed.json";
    private FEED_GET_AUTHORS: string = "http://ufeed.azurewebsites.net/api/social/authors";

    constructor(private http: Http, private authService: AuthService) {

        let headers = new Headers();
        headers.append("Content-type", "application/json");
        headers.append("Authorization", this.authService.AuthHeader.get("Authorization"));
    }




    getFeed() {
        return this.http.get(this.FEED_URL)
            .map(resp => resp.json());
    }

    getAuthors(token: string) {

        let headers = new Headers();
        headers.append("Content-type", "application/json");
        headers.append("Authorization", this.authService.AuthHeader.get("Authorization"));

        return this.http.post(this.FEED_GET_AUTHORS, {
            FacebookLogin: {
                // todo unhardcode
                AccessToken: 'EAACAjHMvjOMBAActU7q8235gEU77mZBcVknrHkOpRJKOnXpa7q49xn7lT3hkGnVwMptnnxTh1tgUobPZBjkNxdM16aLRkJqOhx3bAYdg6vk4U691zSpfjnuCETOd5ZBQtRRzUQFZBPUZCZCrs6HrKe0JwBndPy0EcZD'
            }
        }, {headers: headers})
            .map(resp => resp.json());
    }
}