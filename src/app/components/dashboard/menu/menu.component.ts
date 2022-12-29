import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DownloadImage } from 'src/app/interfaces/downloadImage';
import { ApiService } from 'src/app/services/api.service';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  messageHour!: string;
  showUserName!: string;
  isDefaultImage = '../../../../assets/images/avatar-default.png';
  userImage!: SafeResourceUrl;

  constructor(
    private localStorage: LocalstorageService,
    private api: ApiService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUserName();
    this.getUserImage();
  }

  getUserImage() {
    const imageName = this.localStorage.getLocalStorage('userInfo');
    this.api.downloadImage(imageName.image).subscribe((res: DownloadImage) => {
      let url = 'data:image/jpg;base64,' + res.image;
      this.userImage = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    });
  }

  getMessageHour(message: string) {
    this.messageHour = message;
  }

  getUserName() {
    const userName = this.localStorage.getLocalStorage('userInfo');
    this.showUserName = userName.name;
  }

  logout() {
    this.localStorage.removeLocalStorage('token');
    this.router.navigate(['/']);
  }
}
