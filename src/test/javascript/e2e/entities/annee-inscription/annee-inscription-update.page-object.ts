import { element, by, ElementFinder } from 'protractor';

export default class AnneeInscriptionUpdatePage {
  pageTitle: ElementFinder = element(by.id('pfumv10App.anneeInscription.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  anneeInput: ElementFinder = element(by.css('input#annee-inscription-annee'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAnneeInput(annee) {
    await this.anneeInput.sendKeys(annee);
  }

  async getAnneeInput() {
    return this.anneeInput.getAttribute('value');
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
