import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Education by IT Park';
  constructor(private translateService: TranslateService) {}
  ngOnInit(): void {
    this.translateService.use(environment.defaultLocale);
  }
}
