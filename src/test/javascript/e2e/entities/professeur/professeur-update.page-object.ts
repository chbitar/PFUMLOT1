import { element, by, ElementFinder } from 'protractor';

export default class ProfesseurUpdatePage {
  pageTitle: ElementFinder = element(by.id('pfumv10App.professeur.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nomInput: ElementFinder = element(by.css('input#professeur-nom'));
  prenomInput: ElementFinder = element(by.css('input#professeur-prenom'));
  etablissementInput: ElementFinder = element(by.css('input#professeur-etablissement'));
  gradeInput: ElementFinder = element(by.css('input#professeur-grade'));
  diplomeInput: ElementFinder = element(by.css('input#professeur-diplome'));
  cinInput: ElementFinder = element(by.css('input#professeur-cin'));
  ribInput: ElementFinder = element(by.css('input#professeur-rib'));
  emailInput: ElementFinder = element(by.css('input#professeur-email'));
  userSelect: ElementFinder = element(by.css('select#professeur-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNomInput(nom) {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput() {
    return this.nomInput.getAttribute('value');
  }

  async setPrenomInput(prenom) {
    await this.prenomInput.sendKeys(prenom);
  }

  async getPrenomInput() {
    return this.prenomInput.getAttribute('value');
  }

  async setEtablissementInput(etablissement) {
    await this.etablissementInput.sendKeys(etablissement);
  }

  async getEtablissementInput() {
    return this.etablissementInput.getAttribute('value');
  }

  async setGradeInput(grade) {
    await this.gradeInput.sendKeys(grade);
  }

  async getGradeInput() {
    return this.gradeInput.getAttribute('value');
  }

  async setDiplomeInput(diplome) {
    await this.diplomeInput.sendKeys(diplome);
  }

  async getDiplomeInput() {
    return this.diplomeInput.getAttribute('value');
  }

  async setCinInput(cin) {
    await this.cinInput.sendKeys(cin);
  }

  async getCinInput() {
    return this.cinInput.getAttribute('value');
  }

  async setRibInput(rib) {
    await this.ribInput.sendKeys(rib);
  }

  async getRibInput() {
    return this.ribInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
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
