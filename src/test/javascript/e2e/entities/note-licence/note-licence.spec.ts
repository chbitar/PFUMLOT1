/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import NoteLicenceComponentsPage from './note-licence.page-object';
import { NoteLicenceDeleteDialog } from './note-licence.page-object';
import NoteLicenceUpdatePage from './note-licence-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('NoteLicence e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let noteLicenceUpdatePage: NoteLicenceUpdatePage;
  let noteLicenceComponentsPage: NoteLicenceComponentsPage;
  let noteLicenceDeleteDialog: NoteLicenceDeleteDialog;

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

  it('should load NoteLicences', async () => {
    await navBarPage.getEntityPage('note-licence');
    noteLicenceComponentsPage = new NoteLicenceComponentsPage();
    expect(await noteLicenceComponentsPage.getTitle().getText()).to.match(/Note Licences/);
  });

  it('should load create NoteLicence page', async () => {
    await noteLicenceComponentsPage.clickOnCreateButton();
    noteLicenceUpdatePage = new NoteLicenceUpdatePage();
    expect(await noteLicenceUpdatePage.getPageTitle().getAttribute('id')).to.match(/pfumv10App.noteLicence.home.createOrEditLabel/);
    await noteLicenceUpdatePage.cancel();
  });

  it('should create and save NoteLicences', async () => {
    async function createNoteLicence() {
      await noteLicenceComponentsPage.clickOnCreateButton();
      await noteLicenceUpdatePage.semestreSelectLastOption();
      await noteLicenceUpdatePage.setNoteCC1Input('5');
      expect(await noteLicenceUpdatePage.getNoteCC1Input()).to.eq('5');
      await noteLicenceUpdatePage.setNoteCC2Input('5');
      expect(await noteLicenceUpdatePage.getNoteCC2Input()).to.eq('5');
      await noteLicenceUpdatePage.setNoteFinalInput('5');
      expect(await noteLicenceUpdatePage.getNoteFinalInput()).to.eq('5');
      await noteLicenceUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await noteLicenceUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
      await noteLicenceUpdatePage.userSelectLastOption();
      await noteLicenceUpdatePage.moduleSelectLastOption();
      await waitUntilDisplayed(noteLicenceUpdatePage.getSaveButton());
      await noteLicenceUpdatePage.save();
      await waitUntilHidden(noteLicenceUpdatePage.getSaveButton());
      expect(await noteLicenceUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createNoteLicence();
    await noteLicenceComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await noteLicenceComponentsPage.countDeleteButtons();
    await createNoteLicence();

    await noteLicenceComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await noteLicenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last NoteLicence', async () => {
    await noteLicenceComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await noteLicenceComponentsPage.countDeleteButtons();
    await noteLicenceComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    noteLicenceDeleteDialog = new NoteLicenceDeleteDialog();
    expect(await noteLicenceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/pfumv10App.noteLicence.delete.question/);
    await noteLicenceDeleteDialog.clickOnConfirmButton();

    await noteLicenceComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await noteLicenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
