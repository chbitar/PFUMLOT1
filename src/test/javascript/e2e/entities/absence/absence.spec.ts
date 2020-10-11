/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AbsenceComponentsPage from './absence.page-object';
import { AbsenceDeleteDialog } from './absence.page-object';
import AbsenceUpdatePage from './absence-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Absence e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let absenceUpdatePage: AbsenceUpdatePage;
  let absenceComponentsPage: AbsenceComponentsPage;
  let absenceDeleteDialog: AbsenceDeleteDialog;

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

  it('should load Absences', async () => {
    await navBarPage.getEntityPage('absence');
    absenceComponentsPage = new AbsenceComponentsPage();
    expect(await absenceComponentsPage.getTitle().getText()).to.match(/Absences/);
  });

  it('should load create Absence page', async () => {
    await absenceComponentsPage.clickOnCreateButton();
    absenceUpdatePage = new AbsenceUpdatePage();
    expect(await absenceUpdatePage.getPageTitle().getAttribute('id')).to.match(/pfumv10App.absence.home.createOrEditLabel/);
    await absenceUpdatePage.cancel();
  });

  it('should create and save Absences', async () => {
    async function createAbsence() {
      await absenceComponentsPage.clickOnCreateButton();
      const selectedAbsent = await absenceUpdatePage.getAbsentInput().isSelected();
      if (selectedAbsent) {
        await absenceUpdatePage.getAbsentInput().click();
        expect(await absenceUpdatePage.getAbsentInput().isSelected()).to.be.false;
      } else {
        await absenceUpdatePage.getAbsentInput().click();
        expect(await absenceUpdatePage.getAbsentInput().isSelected()).to.be.true;
      }
      await absenceUpdatePage.setDateSeanceInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await absenceUpdatePage.getDateSeanceInput()).to.contain('2001-01-01T02:30');
      await absenceUpdatePage.userSelectLastOption();
      await absenceUpdatePage.moduleSelectLastOption();
      await absenceUpdatePage.etudiantsLicenceSelectLastOption();
      await absenceUpdatePage.etudiantsMasterSelectLastOption();
      await absenceUpdatePage.etudiantsExecutifSelectLastOption();
      await waitUntilDisplayed(absenceUpdatePage.getSaveButton());
      await absenceUpdatePage.save();
      await waitUntilHidden(absenceUpdatePage.getSaveButton());
      expect(await absenceUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createAbsence();
    await absenceComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await absenceComponentsPage.countDeleteButtons();
    await createAbsence();

    await absenceComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await absenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Absence', async () => {
    await absenceComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await absenceComponentsPage.countDeleteButtons();
    await absenceComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    absenceDeleteDialog = new AbsenceDeleteDialog();
    expect(await absenceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/pfumv10App.absence.delete.question/);
    await absenceDeleteDialog.clickOnConfirmButton();

    await absenceComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await absenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
