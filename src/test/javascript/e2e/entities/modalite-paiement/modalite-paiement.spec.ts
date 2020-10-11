/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import ModalitePaiementComponentsPage from './modalite-paiement.page-object';
import { ModalitePaiementDeleteDialog } from './modalite-paiement.page-object';
import ModalitePaiementUpdatePage from './modalite-paiement-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';

const expect = chai.expect;

describe('ModalitePaiement e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let modalitePaiementUpdatePage: ModalitePaiementUpdatePage;
  let modalitePaiementComponentsPage: ModalitePaiementComponentsPage;
  let modalitePaiementDeleteDialog: ModalitePaiementDeleteDialog;

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

  it('should load ModalitePaiements', async () => {
    await navBarPage.getEntityPage('modalite-paiement');
    modalitePaiementComponentsPage = new ModalitePaiementComponentsPage();
    expect(await modalitePaiementComponentsPage.getTitle().getText()).to.match(/Modalite Paiements/);
  });

  it('should load create ModalitePaiement page', async () => {
    await modalitePaiementComponentsPage.clickOnCreateButton();
    modalitePaiementUpdatePage = new ModalitePaiementUpdatePage();
    expect(await modalitePaiementUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /pfumv10App.modalitePaiement.home.createOrEditLabel/
    );
    await modalitePaiementUpdatePage.cancel();
  });

  it('should create and save ModalitePaiements', async () => {
    async function createModalitePaiement() {
      await modalitePaiementComponentsPage.clickOnCreateButton();
      await modalitePaiementUpdatePage.setModaliteInput('modalite');
      expect(await modalitePaiementUpdatePage.getModaliteInput()).to.match(/modalite/);
      await modalitePaiementUpdatePage.setCoutProgrammettcInput('5');
      expect(await modalitePaiementUpdatePage.getCoutProgrammettcInput()).to.eq('5');
      await modalitePaiementUpdatePage.setCoutProgrammettcDeviseInput('5');
      expect(await modalitePaiementUpdatePage.getCoutProgrammettcDeviseInput()).to.eq('5');
      await modalitePaiementUpdatePage.setRemiseNiveau1Input('5');
      expect(await modalitePaiementUpdatePage.getRemiseNiveau1Input()).to.eq('5');
      await modalitePaiementUpdatePage.setRemiseNiveau2Input('5');
      expect(await modalitePaiementUpdatePage.getRemiseNiveau2Input()).to.eq('5');
      await modalitePaiementUpdatePage.deviseSelectLastOption();
      await waitUntilDisplayed(modalitePaiementUpdatePage.getSaveButton());
      await modalitePaiementUpdatePage.save();
      await waitUntilHidden(modalitePaiementUpdatePage.getSaveButton());
      expect(await modalitePaiementUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createModalitePaiement();
    await modalitePaiementComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await modalitePaiementComponentsPage.countDeleteButtons();
    await createModalitePaiement();

    await modalitePaiementComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await modalitePaiementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last ModalitePaiement', async () => {
    await modalitePaiementComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await modalitePaiementComponentsPage.countDeleteButtons();
    await modalitePaiementComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    modalitePaiementDeleteDialog = new ModalitePaiementDeleteDialog();
    expect(await modalitePaiementDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/pfumv10App.modalitePaiement.delete.question/);
    await modalitePaiementDeleteDialog.clickOnConfirmButton();

    await modalitePaiementComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await modalitePaiementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
