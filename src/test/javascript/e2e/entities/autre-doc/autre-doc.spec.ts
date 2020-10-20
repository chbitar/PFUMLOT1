/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AutreDocComponentsPage from './autre-doc.page-object';
import { AutreDocDeleteDialog } from './autre-doc.page-object';
import AutreDocUpdatePage from './autre-doc-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('AutreDoc e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let autreDocUpdatePage: AutreDocUpdatePage;
  let autreDocComponentsPage: AutreDocComponentsPage;
  let autreDocDeleteDialog: AutreDocDeleteDialog;
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

  it('should load AutreDocs', async () => {
    await navBarPage.getEntityPage('autre-doc');
    autreDocComponentsPage = new AutreDocComponentsPage();
    expect(await autreDocComponentsPage.getTitle().getText()).to.match(/Autre Docs/);
  });

  it('should load create AutreDoc page', async () => {
    await autreDocComponentsPage.clickOnCreateButton();
    autreDocUpdatePage = new AutreDocUpdatePage();
    expect(await autreDocUpdatePage.getPageTitle().getAttribute('id')).to.match(/pfumv10App.autreDoc.home.createOrEditLabel/);
    await autreDocUpdatePage.cancel();
  });

  it('should create and save AutreDocs', async () => {
    async function createAutreDoc() {
      await autreDocComponentsPage.clickOnCreateButton();
      await autreDocUpdatePage.setTitreInput('titre');
      expect(await autreDocUpdatePage.getTitreInput()).to.match(/titre/);
      await autreDocUpdatePage.setDataInput(absolutePath);
      await autreDocUpdatePage.etudiantexecSelectLastOption();
      await waitUntilDisplayed(autreDocUpdatePage.getSaveButton());
      await autreDocUpdatePage.save();
      await waitUntilHidden(autreDocUpdatePage.getSaveButton());
      expect(await autreDocUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createAutreDoc();
    await autreDocComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await autreDocComponentsPage.countDeleteButtons();
    await createAutreDoc();

    await autreDocComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await autreDocComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last AutreDoc', async () => {
    await autreDocComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await autreDocComponentsPage.countDeleteButtons();
    await autreDocComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    autreDocDeleteDialog = new AutreDocDeleteDialog();
    expect(await autreDocDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/pfumv10App.autreDoc.delete.question/);
    await autreDocDeleteDialog.clickOnConfirmButton();

    await autreDocComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await autreDocComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
