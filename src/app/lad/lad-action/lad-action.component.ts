import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LadService } from 'app/services/lad.service';
import { AuthService } from 'app/services/auth.service';
import { DateAdapter } from '@angular/material';
import { ladActionModel, User } from 'app/models/dataModel';

@Component({
  selector: 'app-lad-action',
  templateUrl: './lad-action.component.html',
  styleUrls: ['./lad-action.component.scss']
})
export class LadActionComponent implements OnInit {
  user: User;
  id: string = '';
  loading: boolean = false;
  ladAll = {
    lad: { _id: '', userId: '', ladValue: 100, oneLadMin: 1, oneLadMax: 100, name: 'Test', caption: 'Test', startDate: new Date(), endDate: new Date() },
    ladItems: []
  };
  ladAction: ladActionModel = {
    userId: '', ladUserId: '', ladId: '',
    ladCaption: '',
    ladItemId: '',
    ladItemCaption: '',
    ladItemRate: 1,

    startDate: new Date(),
    endDate: new Date(),
    ladValue: 0,
    oneLadMin: 0,
    oneLadMax: 0,

    actionDate: new Date(),
    actionValue: 0
  };
  constructor(
    private dateAdapter: DateAdapter<Date>,
    private route: ActivatedRoute,
    private router: Router,
    private ladService: LadService,
    private authService: AuthService

  ) {
    this.route.params.subscribe(params => {
      this.id = params["id"];
      console.log('%s ', this.id);
    });

  }

  ngOnInit() {
    this.user = this.authService.getLoginUser();
    this.getLad();
  }

  async getLad() {
    this.loading = true;
    let r = await this.ladService.getLadForAction(this.id);
    if (r.status == 200) {
      this.ladAll = r.data.data;
      this.ladAll.ladItems.forEach(element => {
        element.selected=false;
      });
      console.log(r);
      this.loading = false;
    }
    else {
      this.loading = false;
      this.authService.showNotification('danger', r.message);
      console.log(r);
    }
  }

  async insertLadAction(_ladItem) {
    console.log('insertLadAction');
    this.loading = true;

    this.ladAction.userId = this.user._id;

    this.ladAction.ladItemId = _ladItem._id;
    this.ladAction.ladItemCaption = _ladItem.caption;
    this.ladAction.ladItemRate = _ladItem.rate;
    this.ladAction.actionDate = new Date();

    this.ladAction.ladId = this.ladAll.lad._id;
    this.ladAction.ladUserId = this.ladAll.lad.userId;
    this.ladAction.ladCaption = this.ladAll.lad.caption;
    this.ladAction.startDate = this.ladAll.lad.startDate;
    this.ladAction.endDate = this.ladAll.lad.endDate;
    this.ladAction.oneLadMin = this.ladAll.lad.oneLadMin;
    this.ladAction.oneLadMax = this.ladAll.lad.oneLadMax;
    this.ladAction.ladValue = this.ladAll.lad.ladValue;

    let r = await this.ladService.insertLadAction(this.ladAction);
    if (r.status == 200 || r.status == 201) {
      console.log('insertLadAction %c inserted Data -->', 'color:green;');
      console.log(r);
      this.authService.showNotification('success', 'Success');
      this.loading = false;
    }
    else {
      this.loading = false;
      this.authService.showNotification('danger', r.message);
      console.log('insertLadAction %c Error -->', 'color:red;');
      console.log(r);
    }
  }

  play() {
    let li = this.ladAll.ladItems.findIndex(x => x.selected);
    if (li > -1) {
      if (this.ladAction.actionValue > 0) {
        this.insertLadAction(this.ladAll.ladItems[li]);
      } else {
        console.log('Let me Value!');
      }
    } else {
      console.log('Select Item Please!');
    }
  }
}
