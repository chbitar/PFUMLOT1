import { element, by, ElementFinder } from 'protractor';

export default class EtablissementUpdatePage {
  pageTitle: ElementFinder = element(by.id('pfumv10App.etablissement.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nomEcoleInput: ElementFinder = element(by.css('input#etablissement-nomEcole'));
  adresseInput: ElementFinder = element(by.css('input#etablissement-adresse'));
  rcInput: ElementFinder = element(by.css('input#etablissement-rc'));
  iceInput: ElementFinder = element(by.css('input#etablissement-ice'));
  tpInput: ElementFinder = element(by.css('input#etablissement-tp'));
  identiteFicheInput: ElementFinder = element(by.css('input#etablissement-identiteFiche'));
  logoInput: ElementFinder = element(by.css('input#file_logo'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNomEcoleInput(nomEcole) {
    await this.nomEcoleInput.sendKeys(nomEcole);
  }

  async getNomEcoleInput() {
    return this.nomEcoleInput.getAttribute('value');
  }

  async setAdresseInput(adresse) {
    await this.adresseInput.sendKeys(adresse);
  }

  async getAdresseInput() {
    return this.adresseInput.getAttribute('value');
  }

  async setRcInput(rc) {
    await this.rcInput.sendKeys(rc);
  }

  async getRcInput() {
    return this.rcInput.getAttribute('value');
  }

  async setIceInput(ice) {
    await this.iceInput.sendKeys(ice);
  }

  async getIceInput() {
    return this.iceInput.getAttribute('value');
  }

  async setTpInput(tp) {
    await this.tpInput.sendKeys(tp);
  }

  async getTpInput() {
    return this.tpInput.getAttribute('value');
  }

  async setIdentiteFicheInput(identiteFiche) {
    await this.identiteFicheInput.sendKeys(identiteFiche);
  }

  async getIdentiteFicheInput() {
    return this.identiteFicheInput.getAttribute('value');
  }

  async setLogoInput(logo) {
    await this.logoInput.sendKeys(logo);
  }

  async getLogoInput() {
    return this.logoInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
