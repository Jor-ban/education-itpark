import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CoursesModule } from "./courses/courses.module";
import { HeroComponent } from './components/hero/hero.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { MetrikaModule } from 'ng-yandex-metrika';

const TranslateModuleConfigs = {
  loader: {
    provide: TranslateLoader,
    useFactory: (http: HttpClient): TranslateLoader => {
      return new TranslateHttpLoader(http, '/assets/locale/', '.json');
    },
    deps: [HttpClient]
  },
  useDefaultLang: false,
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoursesModule,
    HttpClientModule,
    TranslateModule.forRoot(TranslateModuleConfigs),
    MetrikaModule.forRoot( { id: 66561331, webvisor: true })
  ],
  providers: [
    TranslateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
