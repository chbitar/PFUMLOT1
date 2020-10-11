import { element, by, ElementFinder } from 'protractor';

export default class AffectationModuleUpdatePage {
  pageTitle: ElementFinder = element(by.id('pfumv10App.affectationModule.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  anneeInput: ElementFinder = element(by.css('input#affectation-module-annee'));
  semestreSelect: ElementFinder = element(by.css('select#affectation-module-semestre'));
  moduleSelect: ElementFinder = element(by.css('select#affectation-module-module'));
  professeurSelect: ElementFinder = element(by.css('select#affectation-module-professeur'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAnneeInput(annee) {
    await this.anneeInput.sendKeys(annee);
  }

  async getAnneeInput() {
    return this.anneeInput.getAttribute('value');
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

  async professeurSelectLastOption() {
    await this.professeurSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async professeurSelectOption(option) {
    await this.professeurSelect.sendKeys(option);
  }

  getProfesseurSelect() {
    return this.professeurSelect;
  }

  async getProfesseurSelectedOption() {
    return this.professeurSelect.element(by.css('option:checked')).getText();
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
