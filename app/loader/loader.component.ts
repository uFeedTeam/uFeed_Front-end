import {Component, Input} from "@angular/core";
@Component({
    moduleId: module.id,
    selector: 'loader',
    styleUrls: ['loader.component.styles.css'],
    templateUrl: ['loader.component.html']
})
export class LoaderComponent {

    @Input()
    predicate: boolean;
}
