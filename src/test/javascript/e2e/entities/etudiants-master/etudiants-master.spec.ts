/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EtudiantsMasterComponentsPage from './etudiants-master.page-object';
import { EtudiantsMasterDeleteDialog } from './etudiants-master.page-object';
import EtudiantsMasterUpdatePage from './etudiants-master-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('EtudiantsMaster e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let etudiantsMasterUpdatePage: EtudiantsMasterUpdatePage;
  let etudiantsMasterComponentsPage: EtudiantsMasterComponentsPage;
  let etudiantsMasterDeleteDialog: EtudiantsMasterDeleteDialog;
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

  it('should load EtudiantsMasters', async () => {
    await navBarPage.getEntityPage('etudiants-master');
    etudiantsMasterComponentsPage = new EtudiantsMasterComponentsPage();
    expect(await etudiantsMasterComponentsPage.getTitle().getText()).to.match(/Etudiants Masters/);
  });

  it('should load create EtudiantsMaster page', async () => {
    await etudiantsMasterComponentsPage.clickOnCreateButton();
    etudiantsMasterUpdatePage = new EtudiantsMasterUpdatePage();
    expect(await etudiantsMasterUpdatePage.getPageTitle().getAttribute('id')).to.match(/pfumv10App.etudiantsMaster.home.createOrEditLabel/);
    await etudiantsMasterUpdatePage.cancel();
  });

  it('should create and save EtudiantsMasters', async () => {
    async function createEtudiantsMaster() {
      await etudiantsMasterComponentsPage.clickOnCreateButton();
      await etudiantsMasterUpdatePage.setSuffixeInput('suffixe');
      expect(await etudiantsMasterUpdatePage.getSuffixeInput()).to.match(/suffixe/);
      await etudiantsMasterUpdatePage.setNomInput('nom');
      expect(await etudiantsMasterUpdatePage.getNomInput()).to.match(/nom/);
      await etudiantsMasterUpdatePage.setPrenomInput('prenom');
      expect(await etudiantsMasterUpdatePage.getPrenomInput()).to.match(/prenom/);
      await etudiantsMasterUpdatePage.setDateNaissanceInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await etudiantsMasterUpdatePage.getDateNaissanceInput()).to.contain('2001-01-01T02:30');
      await etudiantsMasterUpdatePage.setAdresseContactInput('adresseContact');
      expect(await etudiantsMasterUpdatePage.getAdresseContactInput()).to.match(/adresseContact/);
      await etudiantsMasterUpdatePage.setVilleInput('ville');
      expect(await etudiantsMasterUpdatePage.getVilleInput()).to.match(/ville/);
      await etudiantsMasterUpdatePage.setEmailInput('email');
      expect(await etudiantsMasterUpdatePage.getEmailInput()).to.match(/email/);
      await etudiantsMasterUpdatePage.typeBacSelectLastOption();
      await etudiantsMasterUpdatePage.mentionSelectLastOption();
      await etudiantsMasterUpdatePage.setCinPassInput('cinPass');
      expect(await etudiantsMasterUpdatePage.getCinPassInput()).to.match(/cinPass/);
      await etudiantsMasterUpdatePage.setPaysNationaliteInput('paysNationalite');
      expect(await etudiantsMasterUpdatePage.getPaysNationaliteInput()).to.match(/paysNationalite/);
      await etudiantsMasterUpdatePage.setPaysResidenceInput('paysResidence');
      expect(await etudiantsMasterUpdatePage.getPaysResidenceInput()).to.match(/paysResidence/);
      await etudiantsMasterUpdatePage.setCodepostalInput('codepostal');
      expect(await etudiantsMasterUpdatePage.getCodepostalInput()).to.match(/codepostal/);
      await etudiantsMasterUpdatePage.setProvinceInput('province');
      expect(await etudiantsMasterUpdatePage.getProvinceInput()).to.match(/province/);
      await etudiantsMasterUpdatePage.setTelInput('5');
      expect(await etudiantsMasterUpdatePage.getTelInput()).to.eq('5');
      await etudiantsMasterUpdatePage.setPhotoInput(absolutePath);
      await etudiantsMasterUpdatePage.setExtraitActeNaissanceInput(absolutePath);
      await etudiantsMasterUpdatePage.setBacalaureatInput(absolutePath);
      await etudiantsMasterUpdatePage.setCinPassportInput(absolutePath);
      await etudiantsMasterUpdatePage.setDiplomeInput(absolutePath);
      const selectedInscriptionvalide = await etudiantsMasterUpdatePage.getInscriptionvalideInput().isSelected();
      if (selectedInscriptionvalide) {
        await etudiantsMasterUpdatePage.getInscriptionvalideInput().click();
        expect(await etudiantsMasterUpdatePage.getInscriptionvalideInput().isSelected()).to.be.false;
      } else {
        await etudiantsMasterUpdatePage.getInscriptionvalideInput().click();
        expect(await etudiantsMasterUpdatePage.getInscriptionvalideInput().isSelected()).to.be.true;
      }
      const selectedAbsent = await etudiantsMasterUpdatePage.getAbsentInput().isSelected();
      if (selectedAbsent) {
        await etudiantsMasterUpdatePage.getAbsentInput().click();
        expect(await etudiantsMasterUpdatePage.getAbsentInput().isSelected()).to.be.false;
      } else {
        await etudiantsMasterUpdatePage.getAbsentInput().click();
        expect(await etudiantsMasterUpdatePage.getAbsentInput().isSelected()).to.be.true;
      }
      await etudiantsMasterUpdatePage.userSelectLastOption();
      await etudiantsMasterUpdatePage.filiereSelectLastOption();
      await etudiantsMasterUpdatePage.anneeInscriptionSelectLastOption();
      await etudiantsMasterUpdatePage.modaliteSelectLastOption();
      await waitUntilDisplayed(etudiantsMasterUpdatePage.getSaveButton());
      await etudiantsMasterUpdatePage.save();
      await waitUntilHidden(etudiantsMasterUpdatePage.getSaveButton());
      expect(await etudiantsMasterUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createEtudiantsMaster();
    await etudiantsMasterComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await etudiantsMasterComponentsPage.countDeleteButtons();
    await createEtudiantsMaster();

    await etudiantsMasterComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await etudiantsMasterComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last EtudiantsMaster', async () => {
    await etudiantsMasterComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await etudiantsMasterComponentsPage.countDeleteButtons();
    await etudiantsMasterComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    etudiantsMasterDeleteDialog = new EtudiantsMasterDeleteDialog();
    expect(await etudiantsMasterDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/pfumv10App.etudiantsMaster.delete.question/);
    await etudiantsMasterDeleteDialog.clickOnConfirmButton();

    await etudiantsMasterComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await etudiantsMasterComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
