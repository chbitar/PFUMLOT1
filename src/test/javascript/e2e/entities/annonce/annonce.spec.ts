/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AnnonceComponentsPage from './annonce.page-object';
import { AnnonceDeleteDialog } from './annonce.page-object';
import AnnonceUpdatePage from './annonce-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Annonce e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let annonceUpdatePage: AnnonceUpdatePage;
  let annonceComponentsPage: AnnonceComponentsPage;
  let annonceDeleteDialog: AnnonceDeleteDialog;

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

  it('should load Annonces', async () => {
    await navBarPage.getEntityPage('annonce');
    annonceComponentsPage = new AnnonceComponentsPage();
    expect(await annonceComponentsPage.getTitle().getText()).to.match(/Annonces/);
  });

  it('should load create Annonce page', async () => {
    await annonceComponentsPage.clickOnCreateButton();
    annonceUpdatePage = new AnnonceUpdatePage();
    expect(await annonceUpdatePage.getPageTitle().getAttribute('id')).to.match(/pfumv10App.annonce.home.createOrEditLabel/);
    await annonceUpdatePage.cancel();
  });

  it('should create and save Annonces', async () => {
    async function createAnnonce() {
      await annonceComponentsPage.clickOnCreateButton();
      await annonceUpdatePage.setAnnonceInput('annonce');
      expect(await annonceUpdatePage.getAnnonceInput()).to.match(/annonce/);
      await annonceUpdatePage.setCommentaireInput('commentaire');
      expect(await annonceUpdatePage.getCommentaireInput()).to.match(/commentaire/);
      await waitUntilDisplayed(annonceUpdatePage.getSaveButton());
      await annonceUpdatePage.save();
      await waitUntilHidden(annonceUpdatePage.getSaveButton());
      expect(await annonceUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createAnnonce();
    await annonceComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await annonceComponentsPage.countDeleteButtons();
    await createAnnonce();

    await annonceComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await annonceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Annonce', async () => {
    await annonceComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await annonceComponentsPage.countDeleteButtons();
    await annonceComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    annonceDeleteDialog = new AnnonceDeleteDialog();
    expect(await annonceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/pfumv10App.annonce.delete.question/);
    await annonceDeleteDialog.clickOnConfirmButton();

    await annonceComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await annonceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
