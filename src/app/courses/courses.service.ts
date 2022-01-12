import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {CourseInfoInterface} from "./interfaces/CourseInfo.interface";
import {environment} from "../../environments/environment";

@Injectable()
export class CoursesService {
    constructor(private readonly http: HttpClient) {}

    getCourseInfo(courseName: string):Observable<CourseInfoInterface> {
        return this.http.get<CourseInfoInterface>(environment.apiUrl + `itacademies/search`, {
            params: {
              direction: courseName,
              city: 'all'
            },
        });
    }
    getCourseInfoByFilter(filterParams: HttpParams):Observable<CourseInfoInterface> {
        return this.http.get<CourseInfoInterface>(environment.apiUrl + `itacademies/search`, {
            params: filterParams,
        });
    }
}
