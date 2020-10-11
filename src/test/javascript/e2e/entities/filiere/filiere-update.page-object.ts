import { element, by, ElementFinder } from 'protractor';

export default class FiliereUpdatePage {
  pageTitle: ElementFinder = element(by.id('pfumv10App.filiere.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nomfiliereInput: ElementFinder = element(by.css('input#filiere-nomfiliere'));
  responsableInput: ElementFinder = element(by.css('input#filiere-responsable'));
  accreditaionInput: ElementFinder = element(by.css('input#filiere-accreditaion'));
  programmeSelect: ElementFinder = element(by.css('select#filiere-programme'));
  etablissementSelect: ElementFinder = element(by.css('select#filiere-etablissement'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNomfiliereInput(nomfiliere) {
    await this.nomfiliereInput.sendKeys(nomfiliere);
  }

  async getNomfiliereInput() {
    return this.nomfiliereInput.getAttribute('value');
  }

  async setResponsableInput(responsable) {
    await this.responsableInput.sendKeys(responsable);
  }

  async getResponsableInput() {
    return this.responsableInput.getAttribute('value');
  }

  async setAccreditaionInput(accreditaion) {
    await this.accreditaionInput.sendKeys(accreditaion);
  }

  async getAccreditaionInput() {
    return this.accreditaionInput.getAttribute('value');
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
  async etablissementSelectLastOption() {
    await this.etablissementSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async etablissementSelectOption(option) {
    await this.etablissementSelect.sendKeys(option);
  }

  getEtablissementSelect() {
    return this.etablissementSelect;
  }

  async getEtablissementSelectedOption() {
    return this.etablissementSelect.element(by.css('option:checked')).getText();
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
