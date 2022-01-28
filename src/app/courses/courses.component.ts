import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
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
    city: 'all',
    form: 'both',
    maxPrice: 'all',
    duration: 0,
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
      this.filterForm(data)
      this.filterPrices(data)
      this.filterDuration(data)
      this.removeEmptyCourses(data)
      this.coursesInfo = data
    })
  }
  filterForm(data: CourseInfoInterface):void {
    if(this.filterParams.form == 'both')
      return;  // if no filter is needed

    data.residents.forEach(resident => {
      for(let i = 0; i < resident.courses.length; i++) {
        const course = resident.courses[i]
        if(!course.method.includes(this.filterParams.form)) {
          resident.courses.splice(i--, 1)
        }
      }
    })
  }
  filterPrices(data: CourseInfoInterface):void {
    if(this.filterParams.maxPrice == 'all')
      return;

    data.residents.forEach(resident => {
      for(let i = 0; i < resident.courses.length; i++) {
        const course = resident.courses[i]
        if(course.price.en == 'free') {
          continue
        }
        // remove all characters from number string
        const price = Number(course.price.en?.replace(/[^0-9]/g, ''))
        const maxPrice = Number(this.filterParams.maxPrice.replace(/[^0-9]/g, ''))
        if(price > maxPrice) {
          resident.courses.splice(i--, 1)
        } else {
          console.log(price, maxPrice)
        }
      }
    })
  }
  filterDuration(data: CourseInfoInterface):void {
    if(this.filterParams.duration == 0)
      return;

    data.residents.forEach(resident => {
      for(let i = 0; i < resident.courses.length; i++) {
        const course = resident.courses[i]
        if(course.duration.en?.includes("mon")) {
          // in case people write unknown things
          const duration = Number(course.duration.en.replace(/[^0-9]/g, '')) || 9999
          if(duration > this.filterParams.duration) {
            console.log(course.duration.en)
            resident.courses.splice(i--, 1)
          }
        } else {
          resident.courses.splice(i--, 1)
        }
      }
    })
  }
  removeEmptyCourses(data: CourseInfoInterface):void {
    for(let i = 0; i < data.residents.length; i++) {
      const resident = data.residents[i]
      if(resident.courses.length == 0) {
        data.residents.splice(i--, 1)
      }
    }
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
