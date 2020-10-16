/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EmploieDuTempsComponentsPage from './emploie-du-temps.page-object';
import { EmploieDuTempsDeleteDialog } from './emploie-du-temps.page-object';
import EmploieDuTempsUpdatePage from './emploie-du-temps-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('EmploieDuTemps e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let emploieDuTempsUpdatePage: EmploieDuTempsUpdatePage;
  let emploieDuTempsComponentsPage: EmploieDuTempsComponentsPage;
  let emploieDuTempsDeleteDialog: EmploieDuTempsDeleteDialog;
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

  it('should load EmploieDuTemps', async () => {
    await navBarPage.getEntityPage('emploie-du-temps');
    emploieDuTempsComponentsPage = new EmploieDuTempsComponentsPage();
    expect(await emploieDuTempsComponentsPage.getTitle().getText()).to.match(/Emploie Du Temps/);
  });

  it('should load create EmploieDuTemps page', async () => {
    await emploieDuTempsComponentsPage.clickOnCreateButton();
    emploieDuTempsUpdatePage = new EmploieDuTempsUpdatePage();
    expect(await emploieDuTempsUpdatePage.getPageTitle().getAttribute('id')).to.match(/pfumv10App.emploieDuTemps.home.createOrEditLabel/);
    await emploieDuTempsUpdatePage.cancel();
  });

  it('should create and save EmploieDuTemps', async () => {
    async function createEmploieDuTemps() {
      await emploieDuTempsComponentsPage.clickOnCreateButton();
      await emploieDuTempsUpdatePage.setEmploieDuTempsInput(absolutePath);
      await emploieDuTempsUpdatePage.programmeSelectLastOption();
      await waitUntilDisplayed(emploieDuTempsUpdatePage.getSaveButton());
      await emploieDuTempsUpdatePage.save();
      await waitUntilHidden(emploieDuTempsUpdatePage.getSaveButton());
      expect(await emploieDuTempsUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createEmploieDuTemps();
    await emploieDuTempsComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await emploieDuTempsComponentsPage.countDeleteButtons();
    await createEmploieDuTemps();

    await emploieDuTempsComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await emploieDuTempsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last EmploieDuTemps', async () => {
    await emploieDuTempsComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await emploieDuTempsComponentsPage.countDeleteButtons();
    await emploieDuTempsComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    emploieDuTempsDeleteDialog = new EmploieDuTempsDeleteDialog();
    expect(await emploieDuTempsDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/pfumv10App.emploieDuTemps.delete.question/);
    await emploieDuTempsDeleteDialog.clickOnConfirmButton();

    await emploieDuTempsComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await emploieDuTempsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
