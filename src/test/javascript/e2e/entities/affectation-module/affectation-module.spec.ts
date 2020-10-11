/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import AffectationModuleComponentsPage from './affectation-module.page-object';
import { AffectationModuleDeleteDialog } from './affectation-module.page-object';
import AffectationModuleUpdatePage from './affectation-module-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('AffectationModule e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let affectationModuleUpdatePage: AffectationModuleUpdatePage;
  let affectationModuleComponentsPage: AffectationModuleComponentsPage;
  let affectationModuleDeleteDialog: AffectationModuleDeleteDialog;

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

  it('should load AffectationModules', async () => {
    await navBarPage.getEntityPage('affectation-module');
    affectationModuleComponentsPage = new AffectationModuleComponentsPage();
    expect(await affectationModuleComponentsPage.getTitle().getText()).to.match(/Affectation Modules/);
  });

  it('should load create AffectationModule page', async () => {
    await affectationModuleComponentsPage.clickOnCreateButton();
    affectationModuleUpdatePage = new AffectationModuleUpdatePage();
    expect(await affectationModuleUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /pfumv10App.affectationModule.home.createOrEditLabel/
    );
    await affectationModuleUpdatePage.cancel();
  });

  it('should create and save AffectationModules', async () => {
    async function createAffectationModule() {
      await affectationModuleComponentsPage.clickOnCreateButton();
      await affectationModuleUpdatePage.setAnneeInput('annee');
      expect(await affectationModuleUpdatePage.getAnneeInput()).to.match(/annee/);
      await affectationModuleUpdatePage.semestreSelectLastOption();
      await affectationModuleUpdatePage.moduleSelectLastOption();
      await affectationModuleUpdatePage.professeurSelectLastOption();
      await waitUntilDisplayed(affectationModuleUpdatePage.getSaveButton());
      await affectationModuleUpdatePage.save();
      await waitUntilHidden(affectationModuleUpdatePage.getSaveButton());
      expect(await affectationModuleUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createAffectationModule();
    await affectationModuleComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await affectationModuleComponentsPage.countDeleteButtons();
    await createAffectationModule();

    await affectationModuleComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await affectationModuleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last AffectationModule', async () => {
    await affectationModuleComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await affectationModuleComponentsPage.countDeleteButtons();
    await affectationModuleComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    affectationModuleDeleteDialog = new AffectationModuleDeleteDialog();
    expect(await affectationModuleDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /pfumv10App.affectationModule.delete.question/
    );
    await affectationModuleDeleteDialog.clickOnConfirmButton();

    await affectationModuleComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await affectationModuleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
