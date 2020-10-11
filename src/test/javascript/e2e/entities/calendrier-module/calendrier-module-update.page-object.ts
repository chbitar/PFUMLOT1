import { element, by, ElementFinder } from 'protractor';

export default class CalendrierModuleUpdatePage {
  pageTitle: ElementFinder = element(by.id('pfumv10App.calendrierModule.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  libelleInput: ElementFinder = element(by.css('input#calendrier-module-libelle'));
  dateControlContinu1Input: ElementFinder = element(by.css('input#calendrier-module-dateControlContinu1'));
  dateControlContinu2Input: ElementFinder = element(by.css('input#calendrier-module-dateControlContinu2'));
  moduleSelect: ElementFinder = element(by.css('select#calendrier-module-module'));
  anneeInscriptionSelect: ElementFinder = element(by.css('select#calendrier-module-anneeInscription'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setLibelleInput(libelle) {
    await this.libelleInput.sendKeys(libelle);
  }

  async getLibelleInput() {
    return this.libelleInput.getAttribute('value');
  }

  async setDateControlContinu1Input(dateControlContinu1) {
    await this.dateControlContinu1Input.sendKeys(dateControlContinu1);
  }

  async getDateControlContinu1Input() {
    return this.dateControlContinu1Input.getAttribute('value');
  }

  async setDateControlContinu2Input(dateControlContinu2) {
    await this.dateControlContinu2Input.sendKeys(dateControlContinu2);
  }

  async getDateControlContinu2Input() {
    return this.dateControlContinu2Input.getAttribute('value');
  }

  async moduleSelectLastOption() {
    await this.moduleSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async moduleSelectOption(option) {
    await this.moduleSelect.sendKeys(option);
  }

  getModuleSelect() {
    return this.moduleSelect;
  }

  async getModuleSelectedOption() {
    return this.moduleSelect.element(by.css('option:checked')).getText();
  }

  async anneeInscriptionSelectLastOption() {
    await this.anneeInscriptionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async anneeInscriptionSelectOption(option) {
    await this.anneeInscriptionSelect.sendKeys(option);
  }

  getAnneeInscriptionSelect() {
    return this.anneeInscriptionSelect;
  }

  async getAnneeInscriptionSelectedOption() {
    return this.anneeInscriptionSelect.element(by.css('option:checked')).getText();
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
