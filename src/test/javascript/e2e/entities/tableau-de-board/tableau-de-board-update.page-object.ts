import { element, by, ElementFinder } from 'protractor';

export default class TableauDeBoardUpdatePage {
  pageTitle: ElementFinder = element(by.id('pfumv10App.tableauDeBoard.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  tableauDeBoardInput: ElementFinder = element(by.css('input#tableau-de-board-tableauDeBoard'));
  filierSelect: ElementFinder = element(by.css('select#tableau-de-board-filier'));
  calendrierSelect: ElementFinder = element(by.css('select#tableau-de-board-calendrier'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTableauDeBoardInput(tableauDeBoard) {
    await this.tableauDeBoardInput.sendKeys(tableauDeBoard);
  }

  async getTableauDeBoardInput() {
    return this.tableauDeBoardInput.getAttribute('value');
  }

  async filierSelectLastOption() {
    await this.filierSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async filierSelectOption(option) {
    await this.filierSelect.sendKeys(option);
  }

  getFilierSelect() {
    return this.filierSelect;
  }

  async getFilierSelectedOption() {
    return this.filierSelect.element(by.css('option:checked')).getText();
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
