import { element, by, ElementFinder } from 'protractor';

export default class ModalitePaiementUpdatePage {
  pageTitle: ElementFinder = element(by.id('pfumv10App.modalitePaiement.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  modaliteInput: ElementFinder = element(by.css('input#modalite-paiement-modalite'));
  coutProgrammettcInput: ElementFinder = element(by.css('input#modalite-paiement-coutProgrammettc'));
  coutProgrammettcDeviseInput: ElementFinder = element(by.css('input#modalite-paiement-coutProgrammettcDevise'));
  remiseNiveau1Input: ElementFinder = element(by.css('input#modalite-paiement-remiseNiveau1'));
  remiseNiveau2Input: ElementFinder = element(by.css('input#modalite-paiement-remiseNiveau2'));
  deviseSelect: ElementFinder = element(by.css('select#modalite-paiement-devise'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setModaliteInput(modalite) {
    await this.modaliteInput.sendKeys(modalite);
  }

  async getModaliteInput() {
    return this.modaliteInput.getAttribute('value');
  }

  async setCoutProgrammettcInput(coutProgrammettc) {
    await this.coutProgrammettcInput.sendKeys(coutProgrammettc);
  }

  async getCoutProgrammettcInput() {
    return this.coutProgrammettcInput.getAttribute('value');
  }

  async setCoutProgrammettcDeviseInput(coutProgrammettcDevise) {
    await this.coutProgrammettcDeviseInput.sendKeys(coutProgrammettcDevise);
  }

  async getCoutProgrammettcDeviseInput() {
    return this.coutProgrammettcDeviseInput.getAttribute('value');
  }

  async setRemiseNiveau1Input(remiseNiveau1) {
    await this.remiseNiveau1Input.sendKeys(remiseNiveau1);
  }

  async getRemiseNiveau1Input() {
    return this.remiseNiveau1Input.getAttribute('value');
  }

  async setRemiseNiveau2Input(remiseNiveau2) {
    await this.remiseNiveau2Input.sendKeys(remiseNiveau2);
  }

  async getRemiseNiveau2Input() {
    return this.remiseNiveau2Input.getAttribute('value');
  }

  async setDeviseSelect(devise) {
    await this.deviseSelect.sendKeys(devise);
  }

  async getDeviseSelect() {
    return this.deviseSelect.element(by.css('option:checked')).getText();
  }

  async deviseSelectLastOption() {
    await this.deviseSelect
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
