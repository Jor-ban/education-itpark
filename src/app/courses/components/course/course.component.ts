import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CourseInterface } from '../../interfaces/Course.interface';
import { Locales } from '../../types/locales.enum';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, OnDestroy {
  currentLang: Locales;
  skills !: string[];
  destroy$: Subject<boolean> = new Subject<boolean>()
  @Input("courseInfo") courseInfo !: CourseInterface;


  constructor(public translate: TranslateService) {
    this.currentLang = this.translate.currentLang as Locales
    this.translate.onLangChange.pipe(takeUntil(this.destroy$)).subscribe((change) => {
      this.currentLang = change.lang as Locales
    })
  }

  ngOnInit() {
    this.skills = this.courseInfo.skills.split(/\s*[,]\s*/)
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
