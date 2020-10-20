import { element, by, ElementFinder } from 'protractor';

export default class AutreDocUpdatePage {
  pageTitle: ElementFinder = element(by.id('pfumv10App.autreDoc.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titreInput: ElementFinder = element(by.css('input#autre-doc-titre'));
  dataInput: ElementFinder = element(by.css('input#file_data'));
  etudiantexecSelect: ElementFinder = element(by.css('select#autre-doc-etudiantexec'));

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

  async etudiantexecSelectLastOption() {
    await this.etudiantexecSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async etudiantexecSelectOption(option) {
    await this.etudiantexecSelect.sendKeys(option);
  }

  getEtudiantexecSelect() {
    return this.etudiantexecSelect;
  }

  async getEtudiantexecSelectedOption() {
    return this.etudiantexecSelect.element(by.css('option:checked')).getText();
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
