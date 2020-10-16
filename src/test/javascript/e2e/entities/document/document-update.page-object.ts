import { element, by, ElementFinder } from 'protractor';

export default class DocumentUpdatePage {
  pageTitle: ElementFinder = element(by.id('pfumv10App.document.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titreInput: ElementFinder = element(by.css('input#document-titre'));
  dataInput: ElementFinder = element(by.css('input#file_data'));
  typeDocumentSelect: ElementFinder = element(by.css('select#document-typeDocument'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitreInput(titre) {
    await this.titreInput.sendKeys(titre);
  }

  async getTitreInput() {
    return this.titreInput.getAttribute('value');
  }

  async setDataInput(data) {
    await this.dataInput.sendKeys(data);
  }

  async getDataInput() {
    return this.dataInput.getAttribute('value');
  }

  async setTypeDocumentSelect(typeDocument) {
    await this.typeDocumentSelect.sendKeys(typeDocument);
  }

  async getTypeDocumentSelect() {
    return this.typeDocumentSelect.element(by.css('option:checked')).getText();
  }

  async typeDocumentSelectLastOption() {
    await this.typeDocumentSelect
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
