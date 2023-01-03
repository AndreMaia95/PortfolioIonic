import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalizationService } from './../services/localization/localization.service';
import { Preferences } from '@capacitor/preferences';
import { ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
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
    await this.router.navigate(['/tab2'], {
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
}
