import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, Subscription } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { CoursesService } from "./courses.service";
import { TranslateService } from "@ngx-translate/core";
import { CourseInfoInterface } from './interfaces/CourseInfo.interface';
import { Locales } from './types/locales.enum';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {
  pageId: string = '';
  currentLang: Locales;
  destroy$: Subject<boolean> = new Subject<boolean>()
  coursesInfo !: CourseInfoInterface;
  filterParams: any = {
    city: '',
  }

  constructor(
      private route:ActivatedRoute,
      private coursesService: CoursesService,
      public translate: TranslateService,
  ) {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.pageId = params.id
    });
    this.currentLang = this.translate.currentLang as Locales
    this.translate.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((change) => {
      this.currentLang = change.lang as Locales
    })
  }

  ngOnInit(): void {
    this.getCourseInfo()
  }
  getCourseInfo():void { // this code is here coz original names differ from the names in the API
    this.coursesService.getCourseInfo(this.pageId).pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.coursesInfo = data
    })
  }
  searchByFilter(): void {
    this.filterParams['direction'] = this.pageId
    this.coursesService.getCourseInfoByFilter(this.filterParams).pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.coursesInfo = data
    })
  }
  minifyWebsiteUrl(url:string) :string {
    return url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0]
  }
  normalizeWebsiteUrl(url:string) :string {
    return url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, 'http://')
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
