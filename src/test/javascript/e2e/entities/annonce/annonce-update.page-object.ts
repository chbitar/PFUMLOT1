import { element, by, ElementFinder } from 'protractor';

export default class AnnonceUpdatePage {
  pageTitle: ElementFinder = element(by.id('pfumv10App.annonce.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  annonceInput: ElementFinder = element(by.css('textarea#annonce-annonce'));
  commentaireInput: ElementFinder = element(by.css('textarea#annonce-commentaire'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAnnonceInput(annonce) {
    await this.annonceInput.sendKeys(annonce);
  }

  async getAnnonceInput() {
    return this.annonceInput.getAttribute('value');
  }

  async setCommentaireInput(commentaire) {
    await this.commentaireInput.sendKeys(commentaire);
  }

  async getCommentaireInput() {
    return this.commentaireInput.getAttribute('value');
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
