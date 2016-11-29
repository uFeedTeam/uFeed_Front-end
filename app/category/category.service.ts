import {Injectable} from "@angular/core";
import {Headers, Http, Response} from "@angular/http";
import {AuthService} from "../auth/auth.service";
import {Observable} from "rxjs";
import {UserCredentials} from "../user/UserCredentials";
@Injectable()
export class CategoryService {
    private LOAD_CATEGORIES_URL: string = "/app/category/fake-category.json";

    constructor(private http: Http, private authService: AuthService) {
    }

    createCategory(name: string, uID: number): Observable<any> {
        let headers = this.authService.generateAuthenticatedHeaders();
        let body = {
            Name: name,
            UserId:uID
        };
        return this.http.post('http://ufeed.azurewebsites.net/api/category/new', body, {headers: headers})
            .map((resp: Response) => resp.json);
    }

    getCategories(): Observable<any>  {
        let headers = new Headers();
        headers.append("Content-type", "application/json");
        headers.append("Authorization", `Bearer ${this.authService.AuthHeader.get("Authorization")}`);
        return this.authService.getUserInfo()
            .map((user:UserCredentials) => user.Categories);
    }
}