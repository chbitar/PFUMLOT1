/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ModuleComponentsPage from './module.page-object';
import { ModuleDeleteDialog } from './module.page-object';
import ModuleUpdatePage from './module-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('Module e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let moduleUpdatePage: ModuleUpdatePage;
  let moduleComponentsPage: ModuleComponentsPage;
  let moduleDeleteDialog: ModuleDeleteDialog;

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

  it('should load Modules', async () => {
    await navBarPage.getEntityPage('module');
    moduleComponentsPage = new ModuleComponentsPage();
    expect(await moduleComponentsPage.getTitle().getText()).to.match(/Modules/);
  });

  it('should load create Module page', async () => {
    await moduleComponentsPage.clickOnCreateButton();
    moduleUpdatePage = new ModuleUpdatePage();
    expect(await moduleUpdatePage.getPageTitle().getAttribute('id')).to.match(/pfumv10App.module.home.createOrEditLabel/);
    await moduleUpdatePage.cancel();
  });

  it('should create and save Modules', async () => {
    async function createModule() {
      await moduleComponentsPage.clickOnCreateButton();
      await moduleUpdatePage.setNomModuleInput('nomModule');
      expect(await moduleUpdatePage.getNomModuleInput()).to.match(/nomModule/);
      await moduleUpdatePage.setVolumeHoraireInput('5');
      expect(await moduleUpdatePage.getVolumeHoraireInput()).to.eq('5');
      await moduleUpdatePage.semestreSelectLastOption();
      await moduleUpdatePage.filiereSelectLastOption();
      await waitUntilDisplayed(moduleUpdatePage.getSaveButton());
      await moduleUpdatePage.save();
      await waitUntilHidden(moduleUpdatePage.getSaveButton());
      expect(await moduleUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createModule();
    await moduleComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await moduleComponentsPage.countDeleteButtons();
    await createModule();

    await moduleComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await moduleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Module', async () => {
    await moduleComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await moduleComponentsPage.countDeleteButtons();
    await moduleComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    moduleDeleteDialog = new ModuleDeleteDialog();
    expect(await moduleDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/pfumv10App.module.delete.question/);
    await moduleDeleteDialog.clickOnConfirmButton();

    await moduleComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await moduleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
