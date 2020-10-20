/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ContentComponentsPage from './content.page-object';
import { ContentDeleteDialog } from './content.page-object';
import ContentUpdatePage from './content-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('Content e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let contentUpdatePage: ContentUpdatePage;
  let contentComponentsPage: ContentComponentsPage;
  let contentDeleteDialog: ContentDeleteDialog;
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

  it('should load Contents', async () => {
    await navBarPage.getEntityPage('content');
    contentComponentsPage = new ContentComponentsPage();
    expect(await contentComponentsPage.getTitle().getText()).to.match(/Contents/);
  });

  it('should load create Content page', async () => {
    await contentComponentsPage.clickOnCreateButton();
    contentUpdatePage = new ContentUpdatePage();
    expect(await contentUpdatePage.getPageTitle().getAttribute('id')).to.match(/pfumv10App.content.home.createOrEditLabel/);
    await contentUpdatePage.cancel();
  });

  it('should create and save Contents', async () => {
    async function createContent() {
      await contentComponentsPage.clickOnCreateButton();
      await contentUpdatePage.setDataInput(absolutePath);
      await waitUntilDisplayed(contentUpdatePage.getSaveButton());
      await contentUpdatePage.save();
      await waitUntilHidden(contentUpdatePage.getSaveButton());
      expect(await contentUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createContent();
    await contentComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await contentComponentsPage.countDeleteButtons();
    await createContent();

    await contentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await contentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Content', async () => {
    await contentComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await contentComponentsPage.countDeleteButtons();
    await contentComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    contentDeleteDialog = new ContentDeleteDialog();
    expect(await contentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/pfumv10App.content.delete.question/);
    await contentDeleteDialog.clickOnConfirmButton();

    await contentComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await contentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
