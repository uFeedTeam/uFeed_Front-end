import {Component, OnInit} from "@angular/core";
import {AuthService} from "./auth/auth.service";
@Component({
    moduleId: module.id,
    selector: 'head-component',
    templateUrl: 'head-component.html'
})
export class HeadComponent implements OnInit {
    ngOnInit(): void {
        console.log('init');
    }

    constructor(private authService: AuthService) {
    }

    isAuthorized: boolean = false;


}