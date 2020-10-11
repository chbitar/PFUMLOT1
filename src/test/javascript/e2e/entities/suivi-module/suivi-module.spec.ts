/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import SuiviModuleComponentsPage from './suivi-module.page-object';
import { SuiviModuleDeleteDialog } from './suivi-module.page-object';
import SuiviModuleUpdatePage from './suivi-module-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('SuiviModule e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let suiviModuleUpdatePage: SuiviModuleUpdatePage;
  let suiviModuleComponentsPage: SuiviModuleComponentsPage;
  let suiviModuleDeleteDialog: SuiviModuleDeleteDialog;

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

  it('should load SuiviModules', async () => {
    await navBarPage.getEntityPage('suivi-module');
    suiviModuleComponentsPage = new SuiviModuleComponentsPage();
    expect(await suiviModuleComponentsPage.getTitle().getText()).to.match(/Suivi Modules/);
  });

  it('should load create SuiviModule page', async () => {
    await suiviModuleComponentsPage.clickOnCreateButton();
    suiviModuleUpdatePage = new SuiviModuleUpdatePage();
    expect(await suiviModuleUpdatePage.getPageTitle().getAttribute('id')).to.match(/pfumv10App.suiviModule.home.createOrEditLabel/);
    await suiviModuleUpdatePage.cancel();
  });

  it('should create and save SuiviModules', async () => {
    async function createSuiviModule() {
      await suiviModuleComponentsPage.clickOnCreateButton();
      await suiviModuleUpdatePage.semestreSelectLastOption();
      await suiviModuleUpdatePage.setDescriptifInput('descriptif');
      expect(await suiviModuleUpdatePage.getDescriptifInput()).to.match(/descriptif/);
      await suiviModuleUpdatePage.setObservationsInput('observations');
      expect(await suiviModuleUpdatePage.getObservationsInput()).to.match(/observations/);
      await suiviModuleUpdatePage.setDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await suiviModuleUpdatePage.getDateInput()).to.contain('2001-01-01T02:30');
      await suiviModuleUpdatePage.setDebutCreneauInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await suiviModuleUpdatePage.getDebutCreneauInput()).to.contain('2001-01-01T02:30');
      await suiviModuleUpdatePage.setFinCreneauInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await suiviModuleUpdatePage.getFinCreneauInput()).to.contain('2001-01-01T02:30');
      await suiviModuleUpdatePage.setDureeInput('5');
      expect(await suiviModuleUpdatePage.getDureeInput()).to.eq('5');
      await suiviModuleUpdatePage.userSelectLastOption();
      await suiviModuleUpdatePage.moduleSelectLastOption();
      await waitUntilDisplayed(suiviModuleUpdatePage.getSaveButton());
      await suiviModuleUpdatePage.save();
      await waitUntilHidden(suiviModuleUpdatePage.getSaveButton());
      expect(await suiviModuleUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createSuiviModule();
    await suiviModuleComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await suiviModuleComponentsPage.countDeleteButtons();
    await createSuiviModule();

    await suiviModuleComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await suiviModuleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last SuiviModule', async () => {
    await suiviModuleComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await suiviModuleComponentsPage.countDeleteButtons();
    await suiviModuleComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    suiviModuleDeleteDialog = new SuiviModuleDeleteDialog();
    expect(await suiviModuleDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/pfumv10App.suiviModule.delete.question/);
    await suiviModuleDeleteDialog.clickOnConfirmButton();

    await suiviModuleComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await suiviModuleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
