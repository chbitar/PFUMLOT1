import { element, by, ElementFinder } from 'protractor';

export default class ModuleUpdatePage {
  pageTitle: ElementFinder = element(by.id('pfumv10App.module.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nomModuleInput: ElementFinder = element(by.css('input#module-nomModule'));
  volumeHoraireInput: ElementFinder = element(by.css('input#module-volumeHoraire'));
  semestreSelect: ElementFinder = element(by.css('select#module-semestre'));
  filiereSelect: ElementFinder = element(by.css('select#module-filiere'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNomModuleInput(nomModule) {
    await this.nomModuleInput.sendKeys(nomModule);
  }

  async getNomModuleInput() {
    return this.nomModuleInput.getAttribute('value');
  }

  async setVolumeHoraireInput(volumeHoraire) {
    await this.volumeHoraireInput.sendKeys(volumeHoraire);
  }

  async getVolumeHoraireInput() {
    return this.volumeHoraireInput.getAttribute('value');
  }

  async setSemestreSelect(semestre) {
    await this.semestreSelect.sendKeys(semestre);
  }

  async getSemestreSelect() {
    return this.semestreSelect.element(by.css('option:checked')).getText();
  }

  async semestreSelectLastOption() {
    await this.semestreSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }
  async filiereSelectLastOption() {
    await this.filiereSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async filiereSelectOption(option) {
    await this.filiereSelect.sendKeys(option);
  }

  getFiliereSelect() {
    return this.filiereSelect;
  }

  async getFiliereSelectedOption() {
    return this.filiereSelect.element(by.css('option:checked')).getText();
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
