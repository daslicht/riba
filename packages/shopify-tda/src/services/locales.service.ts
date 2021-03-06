import { LocalesRestService } from '@ribajs/i18n';
import { BaseService } from './base.service';

export class LocalesService extends LocalesRestService {
  public static instance: LocalesService;
  public static getInstance() {
    return this.instance;
  }
  constructor(doNotTranslateDefaultLanguage: boolean = false, showMissingTranslation: boolean = false) {
    let url = `${BaseService.baseUrl}/shopify/api/themes/${(window as any).Shopify.theme.id}/locales`;
    if ((window as any).Shopify.shop) {
      url += `?shop=${(window as any).Shopify.shop}`;
    }
    super(url, doNotTranslateDefaultLanguage, showMissingTranslation);
    if (LocalesService.instance) {
      return LocalesService.instance;
    }
    LocalesService.instance = this;
  }
}
