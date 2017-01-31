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
                AccessToken: "EAACAjHMvjOMBANErH0NOdr3wGDcQC7cJ2rWkAIAZA5jtyuJzACZCq1eaWz7s2E67OnonQ74YYzRpx8G4MBA5jjNWF7evS9RGyvvbBh3ROFlo8zRfuaKZBNDiZCRtsqdNf8cBUAAnnM2lx22KA5mB2CHB3bkZADMIZD"
            },
            VkLogin: {
                AccessToken: this.authService.VKToken,
                UserId: this.authService.VKUserID
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
                AccessToken: "EAACAjHMvjOMBANErH0NOdr3wGDcQC7cJ2rWkAIAZA5jtyuJzACZCq1eaWz7s2E67OnonQ74YYzRpx8G4MBA5jjNWF7evS9RGyvvbBh3ROFlo8zRfuaKZBNDiZCRtsqdNf8cBUAAnnM2lx22KA5mB2CHB3bkZADMIZD"
            },
            VkLogin: {
                AccessToken: this.authService.VKToken,
                UserId: this.authService.VKUserID
            }
        };

        return this.http.post(this.FEED_GET_AUTHORS, body, {headers: heads})
            .map(resp => resp.json());
    }

    like(url: any) {
        return this.http.get(url);
    }
}