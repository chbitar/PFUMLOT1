import { element, by, ElementFinder } from 'protractor';

export default class SuiviModuleUpdatePage {
  pageTitle: ElementFinder = element(by.id('pfumv10App.suiviModule.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  semestreSelect: ElementFinder = element(by.css('select#suivi-module-semestre'));
  descriptifInput: ElementFinder = element(by.css('textarea#suivi-module-descriptif'));
  observationsInput: ElementFinder = element(by.css('textarea#suivi-module-observations'));
  dateInput: ElementFinder = element(by.css('input#suivi-module-date'));
  debutCreneauInput: ElementFinder = element(by.css('input#suivi-module-debutCreneau'));
  finCreneauInput: ElementFinder = element(by.css('input#suivi-module-finCreneau'));
  dureeInput: ElementFinder = element(by.css('input#suivi-module-duree'));
  userSelect: ElementFinder = element(by.css('select#suivi-module-user'));
  moduleSelect: ElementFinder = element(by.css('select#suivi-module-module'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setSemestreSelect(semestre) {
    await this.semestreSelect.sendKeys(semestre);
  }

  async getSemestreSelect() {
    return this.semestreSelect.element(by.css('option:checked')).getText();
  }

  async semestreSelectLastOption() {
    await this.semestreSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async setDescriptifInput(descriptif) {
    await this.descriptifInput.sendKeys(descriptif);
  }

  async getDescriptifInput() {
    return this.descriptifInput.getAttribute('value');
  }

  async setObservationsInput(observations) {
    await this.observationsInput.sendKeys(observations);
  }

  async getObservationsInput() {
    return this.observationsInput.getAttribute('value');
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return this.dateInput.getAttribute('value');
  }

  async setDebutCreneauInput(debutCreneau) {
    await this.debutCreneauInput.sendKeys(debutCreneau);
  }

  async getDebutCreneauInput() {
    return this.debutCreneauInput.getAttribute('value');
  }

  async setFinCreneauInput(finCreneau) {
    await this.finCreneauInput.sendKeys(finCreneau);
  }

  async getFinCreneauInput() {
    return this.finCreneauInput.getAttribute('value');
  }

  async setDureeInput(duree) {
    await this.dureeInput.sendKeys(duree);
  }

  async getDureeInput() {
    return this.dureeInput.getAttribute('value');
  }

  async userSelectLastOption() {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
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
