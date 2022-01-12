import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { RouterModule, Routes } from "@angular/router";
import { CoursesService } from "./courses.service";
import { TranslateModule } from "@ngx-translate/core";
import { CourseModule } from './components/course/course.module';


const routes: Routes = [
  {
    path: 'courses/:id',
    component: CoursesComponent,
  }
];


@NgModule({
  declarations: [
    CoursesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    CourseModule,
  ],
  providers: [
    CoursesService,
  ],
})
export class CoursesModule { }
