import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Cmyk, ColorPickerService } from 'ngx-color-picker';
import { User } from 'src/app/models/user';
import { ToasterService } from 'src/app/services/toaster.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  @Input() started: boolean = false;
  @Input() user!: User;
  originalUser!: User;
  changedUser!: User;
  userHasChanged: boolean = false;

  // COLORPICKER
  public toggle: boolean = false;

  public rgbaText: string = 'rgba(165, 26, 214, 0.2)';

  public colorList = [
    { key: "flame", value: "#e45a33", friendlyName: "Flame" },
    { key: "orange", value: "#fa761e", friendlyName: "Orange" },
    { key: "infrared", value: "#ef486e", friendlyName: "Infrared" },
    { key: "male", value: "#4488ff", friendlyName: "Male Color" },
    { key: "female", value: "#ff44aa", friendlyName: "Female Color" },
    { key: "paleyellow", value: "#ffd165", friendlyName: "Pale Yellow" },
    { key: "gargoylegas", value: "#fde84e", friendlyName: "Gargoyle Gas" },
    { key: "androidgreen", value: "#9ac53e", friendlyName: "Android Green" },
    { key: "carribeangreen", value: "#05d59e", friendlyName: "Carribean Green" },
    { key: "bluejeans", value: "#5bbfea", friendlyName: "Blue Jeans" },
    { key: "cyancornflower", value: "#1089b1", friendlyName: "Cyan Cornflower" },
    { key: "warmblack", value: "#06394a", friendlyName: "Warm Black" },
  ];

  public presetValues: string[] = [];

  public selectedColor: string = 'color1';

  public cmykColor: Cmyk = new Cmyk(0, 0, 0, 0);
  //

  constructor(public vcRef: ViewContainerRef, private cpService: ColorPickerService, private userService: UserService, private toaster: ToasterService) {
    this.presetValues = this.getColorValues();
  }

  ngOnInit() {
    if (!this.user) {
      this.user = new User("", "No user", "");
    } else {
      this.originalUser = this.user;
      this.changedUser = { ...this.user };
    }
  }

  saveUser() {
    if (!this.changedUser.id) {
      this.toaster.showToast("Trying to save a user without ID", 2000, "danger");
      return;
    }
    this.userService.updateUser(this.changedUser.id,this.changedUser.name,this.changedUser.color).then(res => {
      this.toaster.showToast("User saved", 2000, "success");
      this.originalUser = { ...this.changedUser }
      this.user = { ...this.changedUser }
      this.userHasChanged = false;
    })
  }

  // COLORPICKER
  getColorValues() {
    return this.colorList.map(c => c.value);
  }

  setPickedColor(color: string) {
    this.changedUser.color = color;
    this.userHasBeenChanged()
  }

  userHasBeenChanged() {
    if (this.originalUser.color !== this.changedUser.color || this.originalUser.name !== this.changedUser.name) {
      this.userHasChanged = true;
      return;
    }
    this.userHasChanged = false;
  }

  public onChangeColorCmyk(color: string): Cmyk {
    const hsva = this.cpService.stringToHsva(color);

    console.log(hsva);
    if (hsva) {
      const rgba = this.cpService.hsvaToRgba(hsva);

      return this.cpService.rgbaToCmyk(rgba);
    }

    return new Cmyk(0, 0, 0, 0);
  }

  public onChangeColorHex8(color: string) {
    const hsva = this.cpService.stringToHsva(color, true);
    if (hsva) {
      let hsvaString = this.cpService.outputFormat(hsva, 'rgba', null);
      this.setPickedColor(hsvaString);
      return;
    }
  }
}
