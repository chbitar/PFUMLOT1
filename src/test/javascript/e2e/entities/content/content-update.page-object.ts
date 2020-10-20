import { element, by, ElementFinder } from 'protractor';

export default class ContentUpdatePage {
  pageTitle: ElementFinder = element(by.id('pfumv10App.content.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  dataInput: ElementFinder = element(by.css('input#file_data'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDataInput(data) {
    await this.dataInput.sendKeys(data);
  }

  async getDataInput() {
    return this.dataInput.getAttribute('value');
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
