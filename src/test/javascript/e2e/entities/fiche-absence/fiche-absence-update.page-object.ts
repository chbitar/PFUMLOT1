import { element, by, ElementFinder } from 'protractor';

export default class FicheAbsenceUpdatePage {
  pageTitle: ElementFinder = element(by.id('pfumApp.ficheAbsence.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  dateSeanceInput: ElementFinder = element(by.css('input#fiche-absence-dateSeance'));
  moduleSelect: ElementFinder = element(by.css('select#fiche-absence-module'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDateSeanceInput(dateSeance) {
    await this.dateSeanceInput.sendKeys(dateSeance);
  }

  async getDateSeanceInput() {
    return this.dateSeanceInput.getAttribute('value');
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
