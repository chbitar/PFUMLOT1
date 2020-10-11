/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AnneeInscriptionComponentsPage from './annee-inscription.page-object';
import { AnneeInscriptionDeleteDialog } from './annee-inscription.page-object';
import AnneeInscriptionUpdatePage from './annee-inscription-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('AnneeInscription e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let anneeInscriptionUpdatePage: AnneeInscriptionUpdatePage;
  let anneeInscriptionComponentsPage: AnneeInscriptionComponentsPage;
  let anneeInscriptionDeleteDialog: AnneeInscriptionDeleteDialog;

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

  it('should load AnneeInscriptions', async () => {
    await navBarPage.getEntityPage('annee-inscription');
    anneeInscriptionComponentsPage = new AnneeInscriptionComponentsPage();
    expect(await anneeInscriptionComponentsPage.getTitle().getText()).to.match(/Annee Inscriptions/);
  });

  it('should load create AnneeInscription page', async () => {
    await anneeInscriptionComponentsPage.clickOnCreateButton();
    anneeInscriptionUpdatePage = new AnneeInscriptionUpdatePage();
    expect(await anneeInscriptionUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /pfumv10App.anneeInscription.home.createOrEditLabel/
    );
    await anneeInscriptionUpdatePage.cancel();
  });

  it('should create and save AnneeInscriptions', async () => {
    async function createAnneeInscription() {
      await anneeInscriptionComponentsPage.clickOnCreateButton();
      await anneeInscriptionUpdatePage.setAnneeInput('annee');
      expect(await anneeInscriptionUpdatePage.getAnneeInput()).to.match(/annee/);
      await waitUntilDisplayed(anneeInscriptionUpdatePage.getSaveButton());
      await anneeInscriptionUpdatePage.save();
      await waitUntilHidden(anneeInscriptionUpdatePage.getSaveButton());
      expect(await anneeInscriptionUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createAnneeInscription();
    await anneeInscriptionComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await anneeInscriptionComponentsPage.countDeleteButtons();
    await createAnneeInscription();

    await anneeInscriptionComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await anneeInscriptionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last AnneeInscription', async () => {
    await anneeInscriptionComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await anneeInscriptionComponentsPage.countDeleteButtons();
    await anneeInscriptionComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    anneeInscriptionDeleteDialog = new AnneeInscriptionDeleteDialog();
    expect(await anneeInscriptionDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/pfumv10App.anneeInscription.delete.question/);
    await anneeInscriptionDeleteDialog.clickOnConfirmButton();

    await anneeInscriptionComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await anneeInscriptionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
