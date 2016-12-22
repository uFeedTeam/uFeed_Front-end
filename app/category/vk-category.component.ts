import {Component} from "@angular/core";
import {CategoryService} from "./category.service";
import {UserCredentials} from "../user/UserCredentials";
import {AuthService} from "../auth/auth.service";
import {Markers} from "../social.markers";
@Component({
    moduleId: module.id,
    selector: 'vk-component',
    templateUrl: 'concrete-category.component.html'
})
// Yeah: I could have a parent class for both FB and VK components
// But I have no time for refactoring :(
// Sorry, dear reviewer
export class VKComponent {
    newCategoryFlag: boolean = false;
    private UID: number;
    categories: any[];
    globalAuthors: any[];
    socialNetwork = "VK";
    marker=+Markers.VK;

    isLoadingAuthors: boolean = false;

    constructor(private categoryService: CategoryService, private authService: AuthService) {
    }

    ngOnInit(): void {
        this.extractCategories();
        this.extractAuthors();
        this.extractUID();
    }

    private extractUID() {
        this.authService.getUserInfo()
            .subscribe((user: UserCredentials) => {
                this.UID = user.UserId
            });
    }

    popupCategoryCreate(): void {
        this.newCategoryFlag = true;
    }

    private extractCategories() {
        this.newCategoryFlag = false;
        this.categoryService.getCategories()
            .subscribe(categories => {
                this.categories = categories;
            });
    }

    private extractAuthors(): void {
        this.isLoadingAuthors = true;
        this.categoryService.getAuthors()
            .subscribe((authors: any[]) => {
                this.globalAuthors = authors;
                this.isLoadingAuthors = false;
            });
    }

    isAuthorInCategoryForSelected(category, author): boolean {
        for (let i = 0; i < category.Authors.length; i++) {
            let authr = category.Authors[i];
            if (authr.AuthorId === author.Id) {
                return true;
            }
        }
        return false;

    }

    isAuthorInCategory(category, author): boolean {
        for (let i = 0; i < category.Authors.length; i++) {
            let authr = category.Authors[i];
            if (authr.Id === author.Id) {
                return true;
            }
        }
        return false;

    }

    addAuthorToCategory(category, author) {
        console.log('adding author)');
        console.log(author);
        category.Authors.push(author);
    }

    removeAuthorFromCategory(category, author) {
        console.log('removing author)');
        console.log(author);
        for (let i = 0; i < category.Authors.length; i++) {
            let authr = category.Authors[i];
            if (authr.AuthorId === author.AuthorId) {
                category.Authors.splice(category.Authors.indexOf(authr), 1);
            }
        }
    }

    toggleAuthor(category, author) {
        if (this.isAuthorInCategoryForSelected(category, author)) {
            this.removeAuthorFromCategory(category, author);
        } else {
            this.addAuthorToCategory(category, author);
        }
    }

    updateCategories() {
        for( let i = 0; i < this.categories.length; i++) {
            this.categoryService.updateCategory(this.categories[i])
                .subscribe(resp => {}, err => alert("Cannot update categories"));
        }
        alert("Categories updated");
    }

    createCategory(name: string, event: Event): void {
        event.preventDefault();
        this.categoryService.createCategory(name, this.UID)
            .subscribe(
                ok => {
                    this.extractCategories();
                },
                bad => alert("Cannot create category")
            );
    }

    deleteCategory(id: string): void {
        this.categoryService.deleteCategory(id)
            .subscribe(resp => {
                this.removeCategoryWithId(id);
            }, bad => alert("Cannot delete a category"));
    }

    private removeCategoryWithId(id: string) {
        this.categories = this.categories
            .filter((categ: any)=> categ.Id !== id);
    }
}