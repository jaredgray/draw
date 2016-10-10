import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DomService } from "../../app/services/domservice/dom.service";
import { AppModule } from './app.module';
platformBrowserDynamic().bootstrapModule(AppModule, [
    DomService
]);