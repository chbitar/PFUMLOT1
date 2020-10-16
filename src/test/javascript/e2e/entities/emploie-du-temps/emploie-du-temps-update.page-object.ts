import { element, by, ElementFinder } from 'protractor';

export default class EmploieDuTempsUpdatePage {
  pageTitle: ElementFinder = element(by.id('pfumv10App.emploieDuTemps.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  emploieDuTempsInput: ElementFinder = element(by.css('input#file_emploieDuTemps'));
  programmeSelect: ElementFinder = element(by.css('select#emploie-du-temps-programme'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setEmploieDuTempsInput(emploieDuTemps) {
    await this.emploieDuTempsInput.sendKeys(emploieDuTemps);
  }

  async getEmploieDuTempsInput() {
    return this.emploieDuTempsInput.getAttribute('value');
  }

  async setProgrammeSelect(programme) {
    await this.programmeSelect.sendKeys(programme);
  }

  async getProgrammeSelect() {
    return this.programmeSelect.element(by.css('option:checked')).getText();
  }

  async programmeSelectLastOption() {
    await this.programmeSelect
      .all(by.tagName('option'))
      .last()
      .click();
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
