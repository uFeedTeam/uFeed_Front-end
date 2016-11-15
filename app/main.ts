import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./modules/AppModule";

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);

