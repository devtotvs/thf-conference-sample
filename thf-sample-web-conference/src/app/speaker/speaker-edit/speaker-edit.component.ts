import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ThfNotificationService } from '@totvs/thf-ui/services/thf-notification/thf-notification.service';
import { ThfSelectOption } from '@totvs/thf-ui/components/thf-field';

import { Speaker } from './../../model/speaker';
import { SpeakerService } from '../speaker.service';

@Component({
  selector: 'speaker-edit',
  templateUrl: './speaker-edit.component.html',
  styleUrls: ['./speaker-edit.component.css']
})
export class SpeakerEditComponent implements OnInit {

  @Input('speaker') speaker: Speaker = {
    description: undefined,
    email: undefined,
    name: undefined,
    photo: undefined
  };

  private _isUpdate: boolean = false;
  photoOptions: Array<ThfSelectOption> = [
    {
      value: 'avatar1.png',
      label: 'Picture 1'
    }, {
      value: 'avatar2.png',
      label: 'Picture 2'
    }, {
      value: 'avatar3.png',
      label: 'Picture 3'
    }, {
      value: 'avatar4.png',
      label: 'Picture 4'
    }, {
      value: 'avatar5.png',
      label: 'Picture 5'
    }, {
      value: 'avatar6.png',
      label: 'Picture 6'
    }, {
      value: 'avatar7.png',
      label: 'Picture 7'
    }, {
      value: 'avatar8.png',
      label: 'Picture 8'
    }];
  title: string = 'Create speaker';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private speakerService: SpeakerService,
    private thfNotification: ThfNotificationService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.getSpeakerById(params['id'].toString());
      }
    });
  }

  cancel() {
    this.navigateToPath('speakers');
  }

  create() {
    this.speakerService.post(this.speaker).subscribe(speaker => {
      this.thfNotification.success(`Speaker ${speaker.name} created successfully!`);
      this.navigateToPath('speakers');
    }, error => {
      this.thfNotification.error(error.status + ' ' + error.statusText);
    });
  }

  edit() {
    this.speakerService.put(this.speaker).subscribe(speaker => {
      this.thfNotification.success(`Speaker ${speaker.name} updated successfully!`);
      this.navigateToPath('speakers');
    }, error => {
      this.thfNotification.error(error.status + ' ' + error.statusText);
    });
  }

  getSpeakerById(id: string) {
    this.speakerService.getById(id).subscribe(speaker => {
      this.speaker = speaker;

      this.title = `Edit speaker ${this.speaker.name}`;
      this._isUpdate = true;
    }, error => {
      this.thfNotification.error(error.status + ' ' + error.statusText);
    });
  }

  save() {
    if (this._isUpdate) {
      this.edit();
    } else {
      this.create();
    }
  }

  private navigateToPath(path: string) {
    this.router.navigate([path]);
  }

}
