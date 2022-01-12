import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-onProgress',
  templateUrl: './onProgress.component.html',
  styleUrls: ['./onProgress.component.scss']
})
export class OnProgressComponent implements OnInit {

  constructor(public translate: TranslateService) { }

  ngOnInit() {
  }

}
