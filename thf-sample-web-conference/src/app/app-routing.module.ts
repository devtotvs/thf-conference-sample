import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LectureComponent } from './lecture/lecture.component';
import { SpeakerComponent } from './speaker/speaker.component';
import { SpeakerDetailComponent } from './speaker/speaker-detail/speaker-detail.component';
import { SpeakerEditComponent } from './speaker/speaker-edit/speaker-edit.component';

const routes: Routes = [
  { path: 'home', component: SpeakerComponent },
  { path: 'lectures', component: LectureComponent },
  { path: 'speakers', component: SpeakerComponent },
  { path: 'speakers/create', component: SpeakerEditComponent },
  { path: 'speakers/detail/:id', component: SpeakerDetailComponent },
  { path: 'speakers/edit/:id', component: SpeakerEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
