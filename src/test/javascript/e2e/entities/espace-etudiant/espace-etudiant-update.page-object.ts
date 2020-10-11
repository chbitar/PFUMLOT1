import { element, by, ElementFinder } from 'protractor';

export default class EspaceEtudiantUpdatePage {
  pageTitle: ElementFinder = element(by.id('pfumv10App.espaceEtudiant.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  emploiDuTempsInput: ElementFinder = element(by.css('input#file_emploiDuTemps'));
  userSelect: ElementFinder = element(by.css('select#espace-etudiant-user'));
  etudiantLicenceSelect: ElementFinder = element(by.css('select#espace-etudiant-etudiantLicence'));
  etudiantMasterSelect: ElementFinder = element(by.css('select#espace-etudiant-etudiantMaster'));
  etudiantExecutifSelect: ElementFinder = element(by.css('select#espace-etudiant-etudiantExecutif'));
  calendrierSelect: ElementFinder = element(by.css('select#espace-etudiant-calendrier'));
  absenceSelect: ElementFinder = element(by.css('select#espace-etudiant-absence'));
  annonceSelect: ElementFinder = element(by.css('select#espace-etudiant-annonce'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setEmploiDuTempsInput(emploiDuTemps) {
    await this.emploiDuTempsInput.sendKeys(emploiDuTemps);
  }

  async getEmploiDuTempsInput() {
    return this.emploiDuTempsInput.getAttribute('value');
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

  async etudiantLicenceSelectLastOption() {
    await this.etudiantLicenceSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async etudiantLicenceSelectOption(option) {
    await this.etudiantLicenceSelect.sendKeys(option);
  }

  getEtudiantLicenceSelect() {
    return this.etudiantLicenceSelect;
  }

  async getEtudiantLicenceSelectedOption() {
    return this.etudiantLicenceSelect.element(by.css('option:checked')).getText();
  }

  async etudiantMasterSelectLastOption() {
    await this.etudiantMasterSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async etudiantMasterSelectOption(option) {
    await this.etudiantMasterSelect.sendKeys(option);
  }

  getEtudiantMasterSelect() {
    return this.etudiantMasterSelect;
  }

  async getEtudiantMasterSelectedOption() {
    return this.etudiantMasterSelect.element(by.css('option:checked')).getText();
  }

  async etudiantExecutifSelectLastOption() {
    await this.etudiantExecutifSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async etudiantExecutifSelectOption(option) {
    await this.etudiantExecutifSelect.sendKeys(option);
  }

  getEtudiantExecutifSelect() {
    return this.etudiantExecutifSelect;
  }

  async getEtudiantExecutifSelectedOption() {
    return this.etudiantExecutifSelect.element(by.css('option:checked')).getText();
  }

  async calendrierSelectLastOption() {
    await this.calendrierSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async calendrierSelectOption(option) {
    await this.calendrierSelect.sendKeys(option);
  }

  getCalendrierSelect() {
    return this.calendrierSelect;
  }

  async getCalendrierSelectedOption() {
    return this.calendrierSelect.element(by.css('option:checked')).getText();
  }

  async absenceSelectLastOption() {
    await this.absenceSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async absenceSelectOption(option) {
    await this.absenceSelect.sendKeys(option);
  }

  getAbsenceSelect() {
    return this.absenceSelect;
  }

  async getAbsenceSelectedOption() {
    return this.absenceSelect.element(by.css('option:checked')).getText();
  }

  async annonceSelectLastOption() {
    await this.annonceSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async annonceSelectOption(option) {
    await this.annonceSelect.sendKeys(option);
  }

  getAnnonceSelect() {
    return this.annonceSelect;
  }

  async getAnnonceSelectedOption() {
    return this.annonceSelect.element(by.css('option:checked')).getText();
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
