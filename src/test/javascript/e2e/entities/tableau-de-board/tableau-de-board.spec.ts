/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import TableauDeBoardComponentsPage from './tableau-de-board.page-object';
import { TableauDeBoardDeleteDialog } from './tableau-de-board.page-object';
import TableauDeBoardUpdatePage from './tableau-de-board-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('TableauDeBoard e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let tableauDeBoardUpdatePage: TableauDeBoardUpdatePage;
  let tableauDeBoardComponentsPage: TableauDeBoardComponentsPage;
  let tableauDeBoardDeleteDialog: TableauDeBoardDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
  });

  it('should load TableauDeBoards', async () => {
    await navBarPage.getEntityPage('tableau-de-board');
    tableauDeBoardComponentsPage = new TableauDeBoardComponentsPage();
    expect(await tableauDeBoardComponentsPage.getTitle().getText()).to.match(/Tableau De Boards/);
  });

  it('should load create TableauDeBoard page', async () => {
    await tableauDeBoardComponentsPage.clickOnCreateButton();
    tableauDeBoardUpdatePage = new TableauDeBoardUpdatePage();
    expect(await tableauDeBoardUpdatePage.getPageTitle().getAttribute('id')).to.match(/pfumv10App.tableauDeBoard.home.createOrEditLabel/);
    await tableauDeBoardUpdatePage.cancel();
  });

  it('should create and save TableauDeBoards', async () => {
    async function createTableauDeBoard() {
      await tableauDeBoardComponentsPage.clickOnCreateButton();
      await tableauDeBoardUpdatePage.setTableauDeBoardInput('tableauDeBoard');
      expect(await tableauDeBoardUpdatePage.getTableauDeBoardInput()).to.match(/tableauDeBoard/);
      // tableauDeBoardUpdatePage.filierSelectLastOption();
      // tableauDeBoardUpdatePage.calendrierSelectLastOption();
      await waitUntilDisplayed(tableauDeBoardUpdatePage.getSaveButton());
      await tableauDeBoardUpdatePage.save();
      await waitUntilHidden(tableauDeBoardUpdatePage.getSaveButton());
      expect(await tableauDeBoardUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createTableauDeBoard();
    await tableauDeBoardComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await tableauDeBoardComponentsPage.countDeleteButtons();
    await createTableauDeBoard();

    await tableauDeBoardComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await tableauDeBoardComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last TableauDeBoard', async () => {
    await tableauDeBoardComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await tableauDeBoardComponentsPage.countDeleteButtons();
    await tableauDeBoardComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    tableauDeBoardDeleteDialog = new TableauDeBoardDeleteDialog();
    expect(await tableauDeBoardDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/pfumv10App.tableauDeBoard.delete.question/);
    await tableauDeBoardDeleteDialog.clickOnConfirmButton();

    await tableauDeBoardComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await tableauDeBoardComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
