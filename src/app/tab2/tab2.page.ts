import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LocalizationService } from './../services/localization/localization.service';
import { Preferences } from '@capacitor/preferences';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  me: any = {};

  constructor(
    private translateService: TranslateService,
    private toastController: ToastController,
    private LocalizationService: LocalizationService,
    private http: HttpClient,
    private navController: NavController,
    private router: Router
  ) {}

  async goBack() {
    this.navController.setDirection('back');
    await this.router.navigate(['/'], {
      replaceUrl: true,
    });
  }

  async ngOnInit() {
    this.me = await firstValueFrom(
      this.http.get('http://localhost:4242/api/me')
    );
  }

  async changeLanguage(language: string) {
    await Preferences.set({ key: 'user-lang', value: language });
    await this.LocalizationService.setLanguage(language);
    await this.showToast();
  }

  async showToast() {
    const toast = await this.toastController.create({
      message: this.translateService.instant('language as been changed'),
      duration: 4000,
    });
    await toast.present();
  }

  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  isModalOpen2 = false;
  setOpen2(isOpen: boolean) {
    this.isModalOpen2 = isOpen;
  }

  isModalOpen3 = false;
  setOpen3(isOpen: boolean) {
    this.isModalOpen3 = isOpen;
  }

  isModalOpen4 = false;
  setOpen4(isOpen: boolean) {
    this.isModalOpen4 = isOpen;
  }
}
