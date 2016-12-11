import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {AuthService} from "../auth/auth.service";
@Injectable()
export class FeedService {

    private FEED_URL: string = "/app/feed/feed.json";
    private FEED_GET_AUTHORS: string = "http://localhost:3995/api/social/authors";
    constructor(private http: Http, private authService: AuthService) {

    }

    getFeed(categoryId, page, postsCount) {
        let headers = new Headers();
        headers.append("Content-type", "application/json");
        headers.append("Authorization", this.authService.AuthHeader.get("Authorization"));
        let body = {
            FacebookLogin: {
                AccessToken: "EAACAjHMvjOMBAD1aq5rFIuGnvzcasxujvtnmOTHDPZC4eev9rJd25JROzpf60zAZALBezozpsER3wwLS1oRZCjGjZCcQ79wdoeu8bDhZBSAcSQlEcWePoqq8yUjrpATG6KPwvrUTSUyo3DRzZBJ1ezDO3uZBxoRjYgZD"
            },
            VkLogin: {
                AccessToken: "a1594a465fd54f1deb107a284f95e82a0e0f667252e6da5a473858dcbe1163657db1fddcc0f583393f437",
                UserId: "134408351"
            }
        };

        return this.http.post(`http://localhost:3995/api/social/feed/${categoryId}/${page}/${postsCount}`,
            body, {headers: headers})
            .map(resp => resp.json());
    }

    getAuthors(token: string) {

        let heads = new Headers();
        heads.append("Content-type", "application/json");
        heads.append("Authorization", this.authService.AuthHeader.get("Authorization"));

        // register vk and FB
        this.http.post('http://localhost:3995/api/user/addlogin', 1, {headers: heads});
        this.http.post('http://localhost:3995/api/user/addLogin', 0, {headers: heads});
        let body = {
            FacebookLogin: {
                AccessToken: "EAACAjHMvjOMBAD1aq5rFIuGnvzcasxujvtnmOTHDPZC4eev9rJd25JROzpf60zAZALBezozpsER3wwLS1oRZCjGjZCcQ79wdoeu8bDhZBSAcSQlEcWePoqq8yUjrpATG6KPwvrUTSUyo3DRzZBJ1ezDO3uZBxoRjYgZD"
            },
            VkLogin: {
                AccessToken: "a1594a465fd54f1deb107a284f95e82a0e0f667252e6da5a473858dcbe1163657db1fddcc0f583393f437",
                UserId: "134408351"
            }
        };

        return this.http.post(this.FEED_GET_AUTHORS, body, {headers: heads})
            .map(resp => resp.json());
    }
}