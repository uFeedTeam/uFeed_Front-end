import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {AuthService} from "../auth/auth.service";
import {Observable} from "rxjs";
import {UserCredentials} from "../user/UserCredentials";
@Injectable()
export class CategoryService {

    private NEW_CATEGORY_URL = 'http://localhost:3995/api/category/new';
    private GET_AUTHORS_URL = 'http://localhost:3995/api/social/authors';

    constructor(private http: Http, private authService: AuthService) {
    }

    createCategory(name: string, uID: number): Observable<any> {
        let headers = this.authService.generateAuthenticatedHeaders();
        let body = {
            Name: name,
            UserId: uID
        };
        return this.http.post(this.NEW_CATEGORY_URL, body, {headers: headers})
            .map((resp: Response) => resp.json);
    }

    getCategories(): Observable<any> {
        let headers = new Headers();
        headers.append("Content-type", "application/json");
        headers.append("Authorization", `Bearer ${this.authService.AuthHeader.get("Authorization")}`);
        return this.authService.getUserInfo()
            .map((user: UserCredentials) => user.Categories);
    }

    private REMOVE_CATEGORY_URL: string;

    // todo only FB so far
    // todo hardcoded fb token here
    getAuthors(): Observable<any[]> {
        let body = {
            FacebookLogin: {
                AccessToken: this.authService.FBToken
            },
            VkLogin: {
                AccessToken: this.authService.VKToken,
                UserId: this.authService.VKUserID
            }
        };

        let headers = this.authService.generateAuthenticatedHeaders();
        return this.http.post(this.GET_AUTHORS_URL, body, {headers: headers})
            .map(resp => {
                let fbAuthors = resp.json().FacebookAuthors;
                let vkAuthors = resp.json().VkAuthors;
                let result = [];
                for (let i = 0; i < fbAuthors.length; i++) {
                    let fbAuthr = fbAuthors[i];
                    fbAuthr["AuthorId"] = fbAuthr.Id;

                    let vkAuthor = vkAuthors[i];
                    vkAuthor["AuthorId"] = vkAuthor.Id;

                    result.push(fbAuthr);
                    result.push(vkAuthor);
                }
                return result;
            });
    }


    updateCategory(category): Observable<any> {
        for (let i = 0; i < category.Authors.length; i++) {
            let cat = category.Authors[i];
            delete cat.Id;
        }

        console.log('service -> ');
        console.log(category);

        var result = this.http.post("http://localhost:3995/api/category/update", category,
            {headers: this.authService.generateAuthenticatedHeaders()})
            .map(resp => {
                return true;
            });


        return result;
    }

    deleteCategory(categoryId: string): Observable<boolean> {
        let headers = this.authService.generateAuthenticatedHeaders();
        this.REMOVE_CATEGORY_URL = `http://localhost:3995/api/category/${categoryId}/delete`;
        return this.http.get(this.REMOVE_CATEGORY_URL, {headers: headers})
            .map((resp: Response) => true);
    }
}