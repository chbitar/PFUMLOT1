/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import FicheAbsenceComponentsPage from './fiche-absence.page-object';
import { FicheAbsenceDeleteDialog } from './fiche-absence.page-object';
import FicheAbsenceUpdatePage from './fiche-absence-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('FicheAbsence e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let ficheAbsenceUpdatePage: FicheAbsenceUpdatePage;
  let ficheAbsenceComponentsPage: FicheAbsenceComponentsPage;
  let ficheAbsenceDeleteDialog: FicheAbsenceDeleteDialog;

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

  it('should load FicheAbsences', async () => {
    await navBarPage.getEntityPage('fiche-absence');
    ficheAbsenceComponentsPage = new FicheAbsenceComponentsPage();
    expect(await ficheAbsenceComponentsPage.getTitle().getText()).to.match(/Fiche Absences/);
  });

  it('should load create FicheAbsence page', async () => {
    await ficheAbsenceComponentsPage.clickOnCreateButton();
    ficheAbsenceUpdatePage = new FicheAbsenceUpdatePage();
    expect(await ficheAbsenceUpdatePage.getPageTitle().getAttribute('id')).to.match(/pfumApp.ficheAbsence.home.createOrEditLabel/);
    await ficheAbsenceUpdatePage.cancel();
  });

  it('should create and save FicheAbsences', async () => {
    async function createFicheAbsence() {
      await ficheAbsenceComponentsPage.clickOnCreateButton();
      await ficheAbsenceUpdatePage.setDateSeanceInput('01-01-2001');
      expect(await ficheAbsenceUpdatePage.getDateSeanceInput()).to.eq('2001-01-01');
      await ficheAbsenceUpdatePage.moduleSelectLastOption();
      await waitUntilDisplayed(ficheAbsenceUpdatePage.getSaveButton());
      await ficheAbsenceUpdatePage.save();
      await waitUntilHidden(ficheAbsenceUpdatePage.getSaveButton());
      expect(await ficheAbsenceUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createFicheAbsence();
    await ficheAbsenceComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await ficheAbsenceComponentsPage.countDeleteButtons();
    await createFicheAbsence();

    await ficheAbsenceComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await ficheAbsenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last FicheAbsence', async () => {
    await ficheAbsenceComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await ficheAbsenceComponentsPage.countDeleteButtons();
    await ficheAbsenceComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    ficheAbsenceDeleteDialog = new FicheAbsenceDeleteDialog();
    expect(await ficheAbsenceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/pfumApp.ficheAbsence.delete.question/);
    await ficheAbsenceDeleteDialog.clickOnConfirmButton();

    await ficheAbsenceComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await ficheAbsenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
