/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import FiliereComponentsPage from './filiere.page-object';
import { FiliereDeleteDialog } from './filiere.page-object';
import FiliereUpdatePage from './filiere-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Filiere e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let filiereUpdatePage: FiliereUpdatePage;
  let filiereComponentsPage: FiliereComponentsPage;
  let filiereDeleteDialog: FiliereDeleteDialog;

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

  it('should load Filieres', async () => {
    await navBarPage.getEntityPage('filiere');
    filiereComponentsPage = new FiliereComponentsPage();
    expect(await filiereComponentsPage.getTitle().getText()).to.match(/Filieres/);
  });

  it('should load create Filiere page', async () => {
    await filiereComponentsPage.clickOnCreateButton();
    filiereUpdatePage = new FiliereUpdatePage();
    expect(await filiereUpdatePage.getPageTitle().getAttribute('id')).to.match(/pfumv10App.filiere.home.createOrEditLabel/);
    await filiereUpdatePage.cancel();
  });

  it('should create and save Filieres', async () => {
    async function createFiliere() {
      await filiereComponentsPage.clickOnCreateButton();
      await filiereUpdatePage.setNomfiliereInput('nomfiliere');
      expect(await filiereUpdatePage.getNomfiliereInput()).to.match(/nomfiliere/);
      await filiereUpdatePage.setResponsableInput('responsable');
      expect(await filiereUpdatePage.getResponsableInput()).to.match(/responsable/);
      await filiereUpdatePage.setAccreditaionInput('accreditaion');
      expect(await filiereUpdatePage.getAccreditaionInput()).to.match(/accreditaion/);
      await filiereUpdatePage.programmeSelectLastOption();
      await filiereUpdatePage.etablissementSelectLastOption();
      await waitUntilDisplayed(filiereUpdatePage.getSaveButton());
      await filiereUpdatePage.save();
      await waitUntilHidden(filiereUpdatePage.getSaveButton());
      expect(await filiereUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createFiliere();
    await filiereComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await filiereComponentsPage.countDeleteButtons();
    await createFiliere();

    await filiereComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await filiereComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Filiere', async () => {
    await filiereComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await filiereComponentsPage.countDeleteButtons();
    await filiereComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    filiereDeleteDialog = new FiliereDeleteDialog();
    expect(await filiereDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/pfumv10App.filiere.delete.question/);
    await filiereDeleteDialog.clickOnConfirmButton();

    await filiereComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await filiereComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
