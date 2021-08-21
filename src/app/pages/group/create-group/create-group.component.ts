import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { VolunteerGroupService } from 'src/app/shared/services/rest-services/volunteer-group.service';
import { ProvinceService } from 'src/app/shared/services/rest-services/province.service';
import { SupportTypesService } from 'src/app/shared/services/rest-services/support-types.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent implements OnInit {
  location: string = '';
  provinces: IProvince[] = [];
  province: IProvince = {
    id: '',
  };
  district: IDistrict = { code: 0 };
  supportTypes: ISupportType[] = [];

  constructor(
    private _dialogRef: MatDialogRef<CreateGroupComponent>,
    private ProvinceService: ProvinceService,
    private SupportTypesService: SupportTypesService,
    private GroupService: VolunteerGroupService
  ) {
    this.fetchInit();
  }

  fetchInit() {
    this.ProvinceService.findAll().subscribe((result) => {
      this.provinces = result;
    });
    this.SupportTypesService.findAll().subscribe((result) => {
      this.supportTypes = result;
    });
  }

  getProvince(id: string) {
    this.ProvinceService.findOne(id).subscribe((result) => {
      this.province = result;
    });
  }
  getDistrict(id?: number) {
    this.ProvinceService.getDistrict(this.province.id, id).subscribe(
      (result) => {
        this.district = result;
      }
    );
  }

  CloseDialog() {
    this._dialogRef.close();
  }

  async onSubmit(data: IVolunteerGroup) {
    data.type = 'nhom_thien_nguyen';
    // data.detail_info!.support_types = [];
    console.log(data);
    this.GroupService.create(data, {}).subscribe();
  }

  checkSubmit(data: any) {
    if (data.status == 'VALID') this.CloseDialog();
  }


  ngOnInit(): void {}
}
