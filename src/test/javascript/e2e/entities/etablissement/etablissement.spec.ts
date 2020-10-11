/* tslint:disable no-unused-expression */
import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EtablissementComponentsPage from './etablissement.page-object';
import { EtablissementDeleteDialog } from './etablissement.page-object';
import EtablissementUpdatePage from './etablissement-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('Etablissement e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let etablissementUpdatePage: EtablissementUpdatePage;
  let etablissementComponentsPage: EtablissementComponentsPage;
  let etablissementDeleteDialog: EtablissementDeleteDialog;
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

  it('should load Etablissements', async () => {
    await navBarPage.getEntityPage('etablissement');
    etablissementComponentsPage = new EtablissementComponentsPage();
    expect(await etablissementComponentsPage.getTitle().getText()).to.match(/Etablissements/);
  });

  it('should load create Etablissement page', async () => {
    await etablissementComponentsPage.clickOnCreateButton();
    etablissementUpdatePage = new EtablissementUpdatePage();
    expect(await etablissementUpdatePage.getPageTitle().getAttribute('id')).to.match(/pfumv10App.etablissement.home.createOrEditLabel/);
    await etablissementUpdatePage.cancel();
  });

  it('should create and save Etablissements', async () => {
    async function createEtablissement() {
      await etablissementComponentsPage.clickOnCreateButton();
      await etablissementUpdatePage.setNomEcoleInput('nomEcole');
      expect(await etablissementUpdatePage.getNomEcoleInput()).to.match(/nomEcole/);
      await etablissementUpdatePage.setAdresseInput('adresse');
      expect(await etablissementUpdatePage.getAdresseInput()).to.match(/adresse/);
      await etablissementUpdatePage.setRcInput('rc');
      expect(await etablissementUpdatePage.getRcInput()).to.match(/rc/);
      await etablissementUpdatePage.setIceInput('ice');
      expect(await etablissementUpdatePage.getIceInput()).to.match(/ice/);
      await etablissementUpdatePage.setTpInput('tp');
      expect(await etablissementUpdatePage.getTpInput()).to.match(/tp/);
      await etablissementUpdatePage.setIdentiteFicheInput('identiteFiche');
      expect(await etablissementUpdatePage.getIdentiteFicheInput()).to.match(/identiteFiche/);
      await etablissementUpdatePage.setLogoInput(absolutePath);
      await waitUntilDisplayed(etablissementUpdatePage.getSaveButton());
      await etablissementUpdatePage.save();
      await waitUntilHidden(etablissementUpdatePage.getSaveButton());
      expect(await etablissementUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createEtablissement();
    await etablissementComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await etablissementComponentsPage.countDeleteButtons();
    await createEtablissement();

    await etablissementComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await etablissementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last Etablissement', async () => {
    await etablissementComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await etablissementComponentsPage.countDeleteButtons();
    await etablissementComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    etablissementDeleteDialog = new EtablissementDeleteDialog();
    expect(await etablissementDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/pfumv10App.etablissement.delete.question/);
    await etablissementDeleteDialog.clickOnConfirmButton();

    await etablissementComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await etablissementComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
