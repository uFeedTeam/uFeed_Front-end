import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Http, Headers} from "@angular/http";
import {AuthService} from "../auth/auth.service";

@Injectable()
export class BookmarkService {
    private body = {
    FacebookLogin: {
        AccessToken: "EAACAjHMvjOMBAD1aq5rFIuGnvzcasxujvtnmOTHDPZC4eev9rJd25JROzpf60zAZALBezozpsER3wwLS1oRZCjGjZCcQ79wdoeu8bDhZBSAcSQlEcWePoqq8yUjrpATG6KPwvrUTSUyo3DRzZBJ1ezDO3uZBxoRjYgZD"
    },
    VkLogin: {
        AccessToken: "a1594a465fd54f1deb107a284f95e82a0e0f667252e6da5a473858dcbe1163657db1fddcc0f583393f437",
        UserId: "134408351"
    }
};

    private headers: Headers;
    private GET_BOOKMARKS_URL: string = "http://localhost:3995/api/social/bookmarks";

    public constructor(private http: Http, private authService: AuthService) {
        this.headers = new Headers();
        this.headers.append("Content-type", "application/json");
        this.headers.append("Authorization", this.authService.AuthHeader.get("Authorization"));
    }

    getBookmarks(): Observable<any> {
        return this.http.post(this.GET_BOOKMARKS_URL, this.body, {headers: this.headers})
            .map(resp => resp.json());
    }

    addBookmark(source: string, postId: string): Observable<boolean> {
        let add_bookmark_url: string = `http://localhost:3995/api/social/bookmarks/add/${source}/${postId}`;
        return this.http.post(add_bookmark_url, this.body, {headers: this.headers})
            .map(resp => resp.json());
    }

    deleteBookmark(postId: string): Observable<boolean> {
        console.log('deleting ' + postId);
        let delete_bookmark_url: string = `http://localhost:3995/api/social/bookmarks/${postId}/delete`;
        return this.http.post(delete_bookmark_url, this.body, {headers: this.headers})
            .map(resp => true);
    }

}
