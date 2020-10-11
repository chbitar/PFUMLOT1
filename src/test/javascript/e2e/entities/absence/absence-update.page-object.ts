import { element, by, ElementFinder } from 'protractor';

export default class AbsenceUpdatePage {
  pageTitle: ElementFinder = element(by.id('pfumv10App.absence.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  absentInput: ElementFinder = element(by.css('input#absence-absent'));
  dateSeanceInput: ElementFinder = element(by.css('input#absence-dateSeance'));
  userSelect: ElementFinder = element(by.css('select#absence-user'));
  moduleSelect: ElementFinder = element(by.css('select#absence-module'));
  etudiantsLicenceSelect: ElementFinder = element(by.css('select#absence-etudiantsLicence'));
  etudiantsMasterSelect: ElementFinder = element(by.css('select#absence-etudiantsMaster'));
  etudiantsExecutifSelect: ElementFinder = element(by.css('select#absence-etudiantsExecutif'));

  getPageTitle() {
    return this.pageTitle;
  }

  getAbsentInput() {
    return this.absentInput;
  }
  async setDateSeanceInput(dateSeance) {
    await this.dateSeanceInput.sendKeys(dateSeance);
  }

  async getDateSeanceInput() {
    return this.dateSeanceInput.getAttribute('value');
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

  async etudiantsLicenceSelectLastOption() {
    await this.etudiantsLicenceSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async etudiantsLicenceSelectOption(option) {
    await this.etudiantsLicenceSelect.sendKeys(option);
  }

  getEtudiantsLicenceSelect() {
    return this.etudiantsLicenceSelect;
  }

  async getEtudiantsLicenceSelectedOption() {
    return this.etudiantsLicenceSelect.element(by.css('option:checked')).getText();
  }

  async etudiantsMasterSelectLastOption() {
    await this.etudiantsMasterSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async etudiantsMasterSelectOption(option) {
    await this.etudiantsMasterSelect.sendKeys(option);
  }

  getEtudiantsMasterSelect() {
    return this.etudiantsMasterSelect;
  }

  async getEtudiantsMasterSelectedOption() {
    return this.etudiantsMasterSelect.element(by.css('option:checked')).getText();
  }

  async etudiantsExecutifSelectLastOption() {
    await this.etudiantsExecutifSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async etudiantsExecutifSelectOption(option) {
    await this.etudiantsExecutifSelect.sendKeys(option);
  }

  getEtudiantsExecutifSelect() {
    return this.etudiantsExecutifSelect;
  }

  async getEtudiantsExecutifSelectedOption() {
    return this.etudiantsExecutifSelect.element(by.css('option:checked')).getText();
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
