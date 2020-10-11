/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import NoteExecutifComponentsPage from './note-executif.page-object';
import { NoteExecutifDeleteDialog } from './note-executif.page-object';
import NoteExecutifUpdatePage from './note-executif-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('NoteExecutif e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let noteExecutifUpdatePage: NoteExecutifUpdatePage;
  let noteExecutifComponentsPage: NoteExecutifComponentsPage;
  let noteExecutifDeleteDialog: NoteExecutifDeleteDialog;

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

  it('should load NoteExecutifs', async () => {
    await navBarPage.getEntityPage('note-executif');
    noteExecutifComponentsPage = new NoteExecutifComponentsPage();
    expect(await noteExecutifComponentsPage.getTitle().getText()).to.match(/Note Executifs/);
  });

  it('should load create NoteExecutif page', async () => {
    await noteExecutifComponentsPage.clickOnCreateButton();
    noteExecutifUpdatePage = new NoteExecutifUpdatePage();
    expect(await noteExecutifUpdatePage.getPageTitle().getAttribute('id')).to.match(/pfumv10App.noteExecutif.home.createOrEditLabel/);
    await noteExecutifUpdatePage.cancel();
  });

  it('should create and save NoteExecutifs', async () => {
    async function createNoteExecutif() {
      await noteExecutifComponentsPage.clickOnCreateButton();
      await noteExecutifUpdatePage.semestreSelectLastOption();
      await noteExecutifUpdatePage.setNoteCC1Input('5');
      expect(await noteExecutifUpdatePage.getNoteCC1Input()).to.eq('5');
      await noteExecutifUpdatePage.setNoteCC2Input('5');
      expect(await noteExecutifUpdatePage.getNoteCC2Input()).to.eq('5');
      await noteExecutifUpdatePage.setNoteFinalInput('5');
      expect(await noteExecutifUpdatePage.getNoteFinalInput()).to.eq('5');
      await noteExecutifUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await noteExecutifUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
      await noteExecutifUpdatePage.userSelectLastOption();
      await noteExecutifUpdatePage.moduleSelectLastOption();
      await waitUntilDisplayed(noteExecutifUpdatePage.getSaveButton());
      await noteExecutifUpdatePage.save();
      await waitUntilHidden(noteExecutifUpdatePage.getSaveButton());
      expect(await noteExecutifUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createNoteExecutif();
    await noteExecutifComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await noteExecutifComponentsPage.countDeleteButtons();
    await createNoteExecutif();

    await noteExecutifComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await noteExecutifComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last NoteExecutif', async () => {
    await noteExecutifComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await noteExecutifComponentsPage.countDeleteButtons();
    await noteExecutifComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    noteExecutifDeleteDialog = new NoteExecutifDeleteDialog();
    expect(await noteExecutifDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/pfumv10App.noteExecutif.delete.question/);
    await noteExecutifDeleteDialog.clickOnConfirmButton();

    await noteExecutifComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await noteExecutifComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
