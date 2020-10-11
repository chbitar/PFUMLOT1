/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EspaceEtudiantComponentsPage from './espace-etudiant.page-object';
import { EspaceEtudiantDeleteDialog } from './espace-etudiant.page-object';
import EspaceEtudiantUpdatePage from './espace-etudiant-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('EspaceEtudiant e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let espaceEtudiantUpdatePage: EspaceEtudiantUpdatePage;
  let espaceEtudiantComponentsPage: EspaceEtudiantComponentsPage;
  let espaceEtudiantDeleteDialog: EspaceEtudiantDeleteDialog;
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

  it('should load EspaceEtudiants', async () => {
    await navBarPage.getEntityPage('espace-etudiant');
    espaceEtudiantComponentsPage = new EspaceEtudiantComponentsPage();
    expect(await espaceEtudiantComponentsPage.getTitle().getText()).to.match(/Espace Etudiants/);
  });

  it('should load create EspaceEtudiant page', async () => {
    await espaceEtudiantComponentsPage.clickOnCreateButton();
    espaceEtudiantUpdatePage = new EspaceEtudiantUpdatePage();
    expect(await espaceEtudiantUpdatePage.getPageTitle().getAttribute('id')).to.match(/pfumv10App.espaceEtudiant.home.createOrEditLabel/);
    await espaceEtudiantUpdatePage.cancel();
  });

  it('should create and save EspaceEtudiants', async () => {
    async function createEspaceEtudiant() {
      await espaceEtudiantComponentsPage.clickOnCreateButton();
      await espaceEtudiantUpdatePage.setEmploiDuTempsInput(absolutePath);
      await espaceEtudiantUpdatePage.userSelectLastOption();
      await espaceEtudiantUpdatePage.etudiantLicenceSelectLastOption();
      await espaceEtudiantUpdatePage.etudiantMasterSelectLastOption();
      await espaceEtudiantUpdatePage.etudiantExecutifSelectLastOption();
      await espaceEtudiantUpdatePage.calendrierSelectLastOption();
      await espaceEtudiantUpdatePage.absenceSelectLastOption();
      await espaceEtudiantUpdatePage.annonceSelectLastOption();
      await waitUntilDisplayed(espaceEtudiantUpdatePage.getSaveButton());
      await espaceEtudiantUpdatePage.save();
      await waitUntilHidden(espaceEtudiantUpdatePage.getSaveButton());
      expect(await espaceEtudiantUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createEspaceEtudiant();
    await espaceEtudiantComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await espaceEtudiantComponentsPage.countDeleteButtons();
    await createEspaceEtudiant();

    await espaceEtudiantComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await espaceEtudiantComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last EspaceEtudiant', async () => {
    await espaceEtudiantComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await espaceEtudiantComponentsPage.countDeleteButtons();
    await espaceEtudiantComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    espaceEtudiantDeleteDialog = new EspaceEtudiantDeleteDialog();
    expect(await espaceEtudiantDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/pfumv10App.espaceEtudiant.delete.question/);
    await espaceEtudiantDeleteDialog.clickOnConfirmButton();

    await espaceEtudiantComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await espaceEtudiantComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
