/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import DocumentComponentsPage from './document.page-object';
import { DocumentDeleteDialog } from './document.page-object';
import DocumentUpdatePage from './document-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('Document e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let documentUpdatePage: DocumentUpdatePage;
  let documentComponentsPage: DocumentComponentsPage;
  let documentDeleteDialog: DocumentDeleteDialog;
  const fileToUpload = '../../../../../../src/main/webapp/static/images/logo-jhipster.png';
  const absolutePath = path.resolve(__dirname, fileToUpload);

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

  it('should load Documents', async () => {
    await navBarPage.getEntityPage('document');
    documentComponentsPage = new DocumentComponentsPage();
    expect(await documentComponentsPage.getTitle().getText()).to.match(/Documents/);
  });

  it('should load create Document page', async () => {
    await documentComponentsPage.clickOnCreateButton();
    documentUpdatePage = new DocumentUpdatePage();
    expect(await documentUpdatePage.getPageTitle().getAttribute('id')).to.match(/pfumv10App.document.home.createOrEditLabel/);
    await documentUpdatePage.cancel();
  });

  it('should create and save Documents', async () => {
    async function createDocument() {
      await documentComponentsPage.clickOnCreateButton();
      await documentUpdatePage.setTitreInput('titre');
      expect(await documentUpdatePage.getTitreInput()).to.match(/titre/);
      await documentUpdatePage.setDataInput(absolutePath);
      await documentUpdatePage.typeDocumentSelectLastOption();
      await waitUntilDisplayed(documentUpdatePage.getSaveButton());
      await documentUpdatePage.save();
      await waitUntilHidden(documentUpdatePage.getSaveButton());
      expect(await documentUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createDocument();
    await documentComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await documentComponentsPage.countDeleteButtons();
    await createDocument();

    await documentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await documentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Document', async () => {
    await documentComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await documentComponentsPage.countDeleteButtons();
    await documentComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    documentDeleteDialog = new DocumentDeleteDialog();
    expect(await documentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/pfumv10App.document.delete.question/);
    await documentDeleteDialog.clickOnConfirmButton();

    await documentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await documentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
