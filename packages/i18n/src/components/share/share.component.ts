import { TypeOfComponent } from "@ribajs/core";
import {
  Bs4ShareComponent,
  Scope as Bs4ShareScope,
} from "@ribajs/bs4/src/components/bs4-share/bs4-share.component";
import template from "@ribajs/bs4/src/components/bs4-share/bs4-share.component.html";
import labelTemplate from "./share.label.html";
import { ALocalesService } from "../../services/locales-base.service";

interface Scope extends Bs4ShareScope {
  textI18n?: string;
  labelI18n?: string;
  serviceLabelI18n?: string;
}

interface NavigatorShareParam {
  url: string;
  text: string;
  title: string;
}

declare global {
  // tslint:disable: interface-name
  interface Navigator {
    share: (data: NavigatorShareParam) => Promise<any>;
  }
}

/**
 * Component to share the a link (i18n version)
 */
export const i18nShareComponentWrapper = (
  localesService: ALocalesService
): TypeOfComponent<any> => {
  return class I18nShareComponent extends Bs4ShareComponent {
    public static tagName = "i18n-share";

    public _debug = false;

    static get observedAttributes() {
      return [
        ...Bs4ShareComponent.observedAttributes,
        "text-i18n",
        "label-i18n",
        "service-label-i18n",
      ];
    }

    protected localesService: ALocalesService = localesService;

    protected scope: Scope = super.scope;

    constructor(element?: HTMLElement) {
      super(element);
      this.scope = this.getScopeDefaults();
      this.scope.labelTemplate = labelTemplate;
      this.init(Bs4ShareComponent.observedAttributes);
      this.addEventListeners();
    }

    protected connectedCallback() {
      this.init(Bs4ShareComponent.observedAttributes);
      this.addEventListeners();
    }

    protected async initTranslate() {
      return new Promise<string>((resolve) => {
        this.localesService.event.on("changed", async (langcode: string) => {
          return resolve(langcode);
        });
        if (this.localesService.ready) {
          const langcode = this.localesService.getLangcode();
          return resolve(langcode);
        } else {
          this.localesService.event.on("ready", async (langcode: string) => {
            return resolve(langcode);
          });
        }
      });
    }

    protected async translate(langcode: string, value: string) {
      if (!value) {
        return;
      }

      return this.localesService
        .get([langcode, ...value.split(".")])
        .then((locale: string) => {
          // this.debug('changed local', local);
          return locale;
        })
        .catch((error: Error) => {
          console.error(error);
        });
    }

    protected async beforeBind() {
      // this.debug('beforeBind');
      await super.beforeBind();
      const langcode = await this.initTranslate();

      if (this.scope.textI18n) {
        this.scope.text =
          (await this.translate(langcode, this.scope.textI18n)) ||
          this.scope.text;
      }

      if (this.scope.serviceLabelI18n) {
        for (const shareItem of this.scope.shareItems) {
          shareItem.label =
            (await this.translate(
              langcode,
              this.scope.serviceLabelI18n + "." + shareItem.id
            )) || shareItem.label;
        }
      }
    }

    protected async afterBind() {
      await super.afterBind();
    }

    protected template() {
      this.debug("template", this.el, this.el.hasChildNodes());
      if (this.el && this.el.hasChildNodes()) {
        // If a child is set, this is a custom label template
        this.scope.labelTemplate = this.el.innerHTML;
        this.debug("Custom label template: ", this.scope.labelTemplate);
      }
      return template;
    }
  };
};
