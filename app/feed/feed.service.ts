import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";
import {AuthService} from "../auth/auth.service";
@Injectable()
export class FeedService {

    private FEED_URL: string = "/app/feed/feed.json";
    private FEED_GET_AUTHORS: string = "http://ufeed.azurewebsites.net/api/social/authors";

    constructor(private http: Http, private authService: AuthService) {

    }

    getFeed(categoryId, page, postsCount) {
        let headers = new Headers();
        headers.append("Content-type", "application/json");
        headers.append("Authorization", this.authService.AuthHeader.get("Authorization"));

        return this.http.post(`http://ufeed.azurewebsites.net/api/social/feed/${categoryId}/${page}/${postsCount}`,
            {
                "FacebookLogin": {
                    AccessToken: 'EAACAjHMvjOMBAOVud4J15lSmjQUaEhJbHVQCMjNd7tbK6RrJpWTmcBla00ZCJArZBrjyGuinwyMojwV3eOZC7qpxtFo3IpZAWH2nxZC0zVBbHjZCNuNae5LyEaVyzlaw1qgZAUQXd7OixH7aNbiasjUSeRzBjsb6dYZD'
                }
            }, {headers: headers})
            .map(resp => resp.json());
    }

    getAuthors(token: string) {

        let heads = new Headers();
        heads.append("Content-type", "application/json");
        heads.append("Authorization", this.authService.AuthHeader.get("Authorization"));

        return this.http.post(this.FEED_GET_AUTHORS, {
            FacebookLogin: {
                // todo unhardcode
                AccessToken: 'EAACAjHMvjOMBAOVud4J15lSmjQUaEhJbHVQCMjNd7tbK6RrJpWTmcBla00ZCJArZBrjyGuinwyMojwV3eOZC7qpxtFo3IpZAWH2nxZC0zVBbHjZCNuNae5LyEaVyzlaw1qgZAUQXd7OixH7aNbiasjUSeRzBjsb6dYZD'
            }
        }, {headers: heads})
            .map(resp => resp.json());
    }
}