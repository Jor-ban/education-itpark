import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnProgressComponent } from './onProgress.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

const route = {
  path: '',
  component: OnProgressComponent,
}

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild([route]),
  ],
  declarations: [OnProgressComponent]
})
export class OnProgressModule { }
