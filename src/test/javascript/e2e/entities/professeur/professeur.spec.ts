/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ProfesseurComponentsPage from './professeur.page-object';
import { ProfesseurDeleteDialog } from './professeur.page-object';
import ProfesseurUpdatePage from './professeur-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Professeur e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let professeurUpdatePage: ProfesseurUpdatePage;
  let professeurComponentsPage: ProfesseurComponentsPage;
  let professeurDeleteDialog: ProfesseurDeleteDialog;

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

  it('should load Professeurs', async () => {
    await navBarPage.getEntityPage('professeur');
    professeurComponentsPage = new ProfesseurComponentsPage();
    expect(await professeurComponentsPage.getTitle().getText()).to.match(/Professeurs/);
  });

  it('should load create Professeur page', async () => {
    await professeurComponentsPage.clickOnCreateButton();
    professeurUpdatePage = new ProfesseurUpdatePage();
    expect(await professeurUpdatePage.getPageTitle().getAttribute('id')).to.match(/pfumv10App.professeur.home.createOrEditLabel/);
    await professeurUpdatePage.cancel();
  });

  it('should create and save Professeurs', async () => {
    async function createProfesseur() {
      await professeurComponentsPage.clickOnCreateButton();
      await professeurUpdatePage.setNomInput('nom');
      expect(await professeurUpdatePage.getNomInput()).to.match(/nom/);
      await professeurUpdatePage.setPrenomInput('prenom');
      expect(await professeurUpdatePage.getPrenomInput()).to.match(/prenom/);
      await professeurUpdatePage.setEtablissementInput('etablissement');
      expect(await professeurUpdatePage.getEtablissementInput()).to.match(/etablissement/);
      await professeurUpdatePage.setGradeInput('grade');
      expect(await professeurUpdatePage.getGradeInput()).to.match(/grade/);
      await professeurUpdatePage.setDiplomeInput('diplome');
      expect(await professeurUpdatePage.getDiplomeInput()).to.match(/diplome/);
      await professeurUpdatePage.setCinInput('cin');
      expect(await professeurUpdatePage.getCinInput()).to.match(/cin/);
      await professeurUpdatePage.setRibInput('rib');
      expect(await professeurUpdatePage.getRibInput()).to.match(/rib/);
      await professeurUpdatePage.setEmailInput('email');
      expect(await professeurUpdatePage.getEmailInput()).to.match(/email/);
      await professeurUpdatePage.userSelectLastOption();
      await waitUntilDisplayed(professeurUpdatePage.getSaveButton());
      await professeurUpdatePage.save();
      await waitUntilHidden(professeurUpdatePage.getSaveButton());
      expect(await professeurUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createProfesseur();
    await professeurComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await professeurComponentsPage.countDeleteButtons();
    await createProfesseur();

    await professeurComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await professeurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Professeur', async () => {
    await professeurComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await professeurComponentsPage.countDeleteButtons();
    await professeurComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    professeurDeleteDialog = new ProfesseurDeleteDialog();
    expect(await professeurDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/pfumv10App.professeur.delete.question/);
    await professeurDeleteDialog.clickOnConfirmButton();

    await professeurComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await professeurComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
