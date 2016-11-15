import {Component} from "@angular/core";
@Component({
    selector: 'index-dir',
    template: `
        <div class="content">
            <div class="contentHeader">
                <div class="mainLogoContainer">
                    <img src="content/images/mainLogo.png" class="mainLogo">
                </div>
                <div class="mainDescription mainText">
                    <p>allows you to posts, new or other items from different social networks <br>
                    into custom categories and keep it in one place and one format!</p>
                </div>
            </div>
            <div class="contentBody">
                <div class="features mainText">
                    <ul>
                        <h2>YOU ARE ABLE TO:</h2>
                        <li><img src="content/images/unite_icon.png" class="ulIcon">unite a content from different social networks</li>
                        <br>
                        <li><img src="content/images/category_icon.png" class="ulIcon">create custom categories for this content</li>
                        <br>
                        <li><img src="content/images/like_icon.png" class="ulIcon">mark content as favourite to keep it in one place <br>      and make it easy to access</li>
                    </ul>
                    <a href="#"><img src="content/images/letsStart.png" class="startUpLink"></a>
                </div>
                <div class="contentImage">
                    <img src="content/images/computer.png" class="mainImage">
                </div>
            </div>            
        </div>
`
})
export class IndexComponent {

}