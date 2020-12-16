import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fromEventPattern } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { Profile } from './profile-model';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  profileForm: any;

  profile: Profile = {
    email: '',
    first_name: '',
    last_name: '',
    alias: '',
    job_title: '',
    mobile_number: '',
    password: ''
  };

  constructor(private _globalService: GlobalService) { }

  ngOnInit(): void {
    this._globalService.httpGetProfile();
    this._globalService.onHttpGetProfile.subscribe(
      (profile: any) => {
        console.log('this is from my profile ts', profile);
        this.fillForm(profile);
      }
    );

    this.profileForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      first_name: new FormControl('',[Validators.required]),
      last_name: new FormControl('',[Validators.required]),
      alias: new FormControl('',[Validators.required]),
      job_title: new FormControl('',[Validators.required]),
      mobile_number: new FormControl('',[Validators.required]),
      password: new FormControl(''),
      confirm_password: new FormControl('')
    });
  }

  fillForm(data: any): void {
    this.profileForm.patchValue({
      first_name: data.meta.first_name,
      last_name: data.meta.last_name,
      email: data.email,
      alias: data.alias,
      job_title: data.meta.job_title,
      mobile_number: data.meta.mobile_number,
    });
  }

  onSubmit(): void{
    if(this.profileForm.valid){
      const formValues = this.profileForm.value;
      const newFormValues = {
        meta: {
          first_name: formValues.first_name,
          last_name: formValues.last_name,
          job_title: formValues.job_title,
          mobile_number: formValues.mobile_number,
          timezone: 'Asia/Manila'
        },
        current_password: '',
        email: formValues.email,
        alias: formValues.alias
      }
      this._globalService.httpUpdateProfile(newFormValues);
    } else {
      alert('Invalid Form!');
    }
  }
}
