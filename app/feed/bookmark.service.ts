import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Http, Headers} from "@angular/http";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class BookmarkService {
    private headers: Headers;
    private GET_BOOKMARKS_URL: string = "http://localhost:3995/api/social/bookmarks";

    public constructor(private http: Http, private authService: AuthService) {
        this.headers = new Headers();
        this.headers.append("Content-type", "application/json");
        this.headers.append("Authorization", this.authService.AuthHeader.get("Authorization"));
    }

    getBookmarks(): Observable<any> {
        let body = {
            FacebookLogin: {
                AccessToken: this.authService.FBToken
            },
            VkLogin: {
                AccessToken: this.authService.VKToken,
                UserId: this.authService.VKUserID
            }
        };
        return this.http.post(this.GET_BOOKMARKS_URL, body, {headers: this.headers})
            .map(resp => resp.json());
    }

    addBookmark(source: string, postId: string): Observable<boolean> {
        let body = {
            FacebookLogin: {
                AccessToken: this.authService.FBToken
            },
            VkLogin: {
                AccessToken: this.authService.VKToken,
                UserId: this.authService.VKUserID
            }
        };
        let add_bookmark_url: string = `http://localhost:3995/api/social/bookmarks/add/${source}/${postId}`;
        return this.http.post(add_bookmark_url, body, {headers: this.headers})
            .map(resp => resp.json());
    }

    deleteBookmark(postId: string): Observable<boolean> {
        console.log('deleting ' + postId);
        let body = {
            FacebookLogin: {
                AccessToken: this.authService.FBToken
            },
            VkLogin: {
                AccessToken: this.authService.VKToken,
                UserId: this.authService.VKUserID
            }
        };
        let delete_bookmark_url: string = `http://localhost:3995/api/social/bookmarks/${postId}/delete`;
        return this.http.post(delete_bookmark_url, body, {headers: this.headers})
            .map(resp => true);
    }

}
