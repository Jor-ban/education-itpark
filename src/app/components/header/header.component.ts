import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public currentLocale: string = 'uz';
  constructor(public translate: TranslateService) { }

  ngOnInit(): void {
    this.currentLocale = this.translate.currentLang
  }
  public changeLocale(locale: string):void {
    this.translate.use(locale);
    this.currentLocale = locale;
  }
}
