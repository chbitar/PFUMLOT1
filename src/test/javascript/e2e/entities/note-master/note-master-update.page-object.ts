import { element, by, ElementFinder } from 'protractor';

export default class NoteMasterUpdatePage {
  pageTitle: ElementFinder = element(by.id('pfumv10App.noteMaster.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  semestreSelect: ElementFinder = element(by.css('select#note-master-semestre'));
  noteCC1Input: ElementFinder = element(by.css('input#note-master-noteCC1'));
  noteCC2Input: ElementFinder = element(by.css('input#note-master-noteCC2'));
  noteFinalInput: ElementFinder = element(by.css('input#note-master-noteFinal'));
  dateInput: ElementFinder = element(by.css('input#note-master-date'));
  userSelect: ElementFinder = element(by.css('select#note-master-user'));
  moduleSelect: ElementFinder = element(by.css('select#note-master-module'));

  getPageTitle() {
    return this.pageTitle;
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
  async setNoteCC1Input(noteCC1) {
    await this.noteCC1Input.sendKeys(noteCC1);
  }

  async getNoteCC1Input() {
    return this.noteCC1Input.getAttribute('value');
  }

  async setNoteCC2Input(noteCC2) {
    await this.noteCC2Input.sendKeys(noteCC2);
  }

  async getNoteCC2Input() {
    return this.noteCC2Input.getAttribute('value');
  }

  async setNoteFinalInput(noteFinal) {
    await this.noteFinalInput.sendKeys(noteFinal);
  }

  async getNoteFinalInput() {
    return this.noteFinalInput.getAttribute('value');
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return this.dateInput.getAttribute('value');
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
