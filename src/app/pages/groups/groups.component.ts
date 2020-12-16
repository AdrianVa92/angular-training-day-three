import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  groups: any;

  constructor(private _globalService: GlobalService) { }

  ngOnInit(): void {
    this._globalService.httpGetProfile();
    this.getGroups();
  }
  getGroups(){
    this._globalService.onHttpGetProfile.subscribe(
      (res: any) => {
        this.groups = res.tag.groups;
        console.log(this.groups);
      }
    );
  }
}
