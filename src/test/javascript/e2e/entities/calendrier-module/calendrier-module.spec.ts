/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import CalendrierModuleComponentsPage from './calendrier-module.page-object';
import { CalendrierModuleDeleteDialog } from './calendrier-module.page-object';
import CalendrierModuleUpdatePage from './calendrier-module-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('CalendrierModule e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let calendrierModuleUpdatePage: CalendrierModuleUpdatePage;
  let calendrierModuleComponentsPage: CalendrierModuleComponentsPage;
  let calendrierModuleDeleteDialog: CalendrierModuleDeleteDialog;

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

  it('should load CalendrierModules', async () => {
    await navBarPage.getEntityPage('calendrier-module');
    calendrierModuleComponentsPage = new CalendrierModuleComponentsPage();
    expect(await calendrierModuleComponentsPage.getTitle().getText()).to.match(/Calendrier Modules/);
  });

  it('should load create CalendrierModule page', async () => {
    await calendrierModuleComponentsPage.clickOnCreateButton();
    calendrierModuleUpdatePage = new CalendrierModuleUpdatePage();
    expect(await calendrierModuleUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /pfumv10App.calendrierModule.home.createOrEditLabel/
    );
    await calendrierModuleUpdatePage.cancel();
  });

  it('should create and save CalendrierModules', async () => {
    async function createCalendrierModule() {
      await calendrierModuleComponentsPage.clickOnCreateButton();
      await calendrierModuleUpdatePage.setLibelleInput('libelle');
      expect(await calendrierModuleUpdatePage.getLibelleInput()).to.match(/libelle/);
      await calendrierModuleUpdatePage.setDateControlContinu1Input('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await calendrierModuleUpdatePage.getDateControlContinu1Input()).to.contain('2001-01-01T02:30');
      await calendrierModuleUpdatePage.setDateControlContinu2Input('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await calendrierModuleUpdatePage.getDateControlContinu2Input()).to.contain('2001-01-01T02:30');
      await calendrierModuleUpdatePage.moduleSelectLastOption();
      await calendrierModuleUpdatePage.anneeInscriptionSelectLastOption();
      await waitUntilDisplayed(calendrierModuleUpdatePage.getSaveButton());
      await calendrierModuleUpdatePage.save();
      await waitUntilHidden(calendrierModuleUpdatePage.getSaveButton());
      expect(await calendrierModuleUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createCalendrierModule();
    await calendrierModuleComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await calendrierModuleComponentsPage.countDeleteButtons();
    await createCalendrierModule();

    await calendrierModuleComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await calendrierModuleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last CalendrierModule', async () => {
    await calendrierModuleComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await calendrierModuleComponentsPage.countDeleteButtons();
    await calendrierModuleComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    calendrierModuleDeleteDialog = new CalendrierModuleDeleteDialog();
    expect(await calendrierModuleDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/pfumv10App.calendrierModule.delete.question/);
    await calendrierModuleDeleteDialog.clickOnConfirmButton();

    await calendrierModuleComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await calendrierModuleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
