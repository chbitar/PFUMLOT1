/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import NoteMasterComponentsPage from './note-master.page-object';
import { NoteMasterDeleteDialog } from './note-master.page-object';
import NoteMasterUpdatePage from './note-master-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('NoteMaster e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let noteMasterUpdatePage: NoteMasterUpdatePage;
  let noteMasterComponentsPage: NoteMasterComponentsPage;
  let noteMasterDeleteDialog: NoteMasterDeleteDialog;

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

  it('should load NoteMasters', async () => {
    await navBarPage.getEntityPage('note-master');
    noteMasterComponentsPage = new NoteMasterComponentsPage();
    expect(await noteMasterComponentsPage.getTitle().getText()).to.match(/Note Masters/);
  });

  it('should load create NoteMaster page', async () => {
    await noteMasterComponentsPage.clickOnCreateButton();
    noteMasterUpdatePage = new NoteMasterUpdatePage();
    expect(await noteMasterUpdatePage.getPageTitle().getAttribute('id')).to.match(/pfumv10App.noteMaster.home.createOrEditLabel/);
    await noteMasterUpdatePage.cancel();
  });

  it('should create and save NoteMasters', async () => {
    async function createNoteMaster() {
      await noteMasterComponentsPage.clickOnCreateButton();
      await noteMasterUpdatePage.semestreSelectLastOption();
      await noteMasterUpdatePage.setNoteCC1Input('5');
      expect(await noteMasterUpdatePage.getNoteCC1Input()).to.eq('5');
      await noteMasterUpdatePage.setNoteCC2Input('5');
      expect(await noteMasterUpdatePage.getNoteCC2Input()).to.eq('5');
      await noteMasterUpdatePage.setNoteFinalInput('5');
      expect(await noteMasterUpdatePage.getNoteFinalInput()).to.eq('5');
      await noteMasterUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await noteMasterUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
      await noteMasterUpdatePage.userSelectLastOption();
      await noteMasterUpdatePage.moduleSelectLastOption();
      await waitUntilDisplayed(noteMasterUpdatePage.getSaveButton());
      await noteMasterUpdatePage.save();
      await waitUntilHidden(noteMasterUpdatePage.getSaveButton());
      expect(await noteMasterUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createNoteMaster();
    await noteMasterComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await noteMasterComponentsPage.countDeleteButtons();
    await createNoteMaster();

    await noteMasterComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await noteMasterComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last NoteMaster', async () => {
    await noteMasterComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await noteMasterComponentsPage.countDeleteButtons();
    await noteMasterComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    noteMasterDeleteDialog = new NoteMasterDeleteDialog();
    expect(await noteMasterDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/pfumv10App.noteMaster.delete.question/);
    await noteMasterDeleteDialog.clickOnConfirmButton();

    await noteMasterComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await noteMasterComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
