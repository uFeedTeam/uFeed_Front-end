import {Component, OnInit} from "@angular/core";
import {CategoryService} from "./category.service";
import {AuthService} from "../auth/auth.service";
import {UserCredentials} from "../user/UserCredentials";
@Component({
    moduleId: module.id,
    selector: 'vk-component',
    templateUrl: 'concrete-category.component.html'
})
export class FacebookComponent implements OnInit {

    newCategoryFlag: boolean = false;
    private UID: number;

    constructor(private categoryService: CategoryService, private authService: AuthService) {
    }

    ngOnInit(): void {
        this.extractCategories();
        this.authService.getUserInfo()
            .subscribe((user: UserCredentials) => {
                console.log('extractCategories -> user');
                console.log(user);
                this.UID = user.UserId
            });
    }

    popupCategoryCreate() : void{
        this.newCategoryFlag = true;
    }

    private extractCategories() {
        this.newCategoryFlag = false;
        this.categoryService.getCategories()
            .subscribe(categories => this.categories = categories);
    }

    createCategory(name: string, event: Event): void {
        event.preventDefault();
        console.log(this.UID);
        this.categoryService.createCategory(name, this.UID)
            .subscribe(
                ok => {
                    this.extractCategories();
                },
                bad => alert("Cannot create category")
            );
    }

    categories: any[];
}
