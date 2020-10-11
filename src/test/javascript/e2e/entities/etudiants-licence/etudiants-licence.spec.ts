/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EtudiantsLicenceComponentsPage from './etudiants-licence.page-object';
import { EtudiantsLicenceDeleteDialog } from './etudiants-licence.page-object';
import EtudiantsLicenceUpdatePage from './etudiants-licence-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('EtudiantsLicence e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let etudiantsLicenceUpdatePage: EtudiantsLicenceUpdatePage;
  let etudiantsLicenceComponentsPage: EtudiantsLicenceComponentsPage;
  let etudiantsLicenceDeleteDialog: EtudiantsLicenceDeleteDialog;
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

  it('should load EtudiantsLicences', async () => {
    await navBarPage.getEntityPage('etudiants-licence');
    etudiantsLicenceComponentsPage = new EtudiantsLicenceComponentsPage();
    expect(await etudiantsLicenceComponentsPage.getTitle().getText()).to.match(/Etudiants Licences/);
  });

  it('should load create EtudiantsLicence page', async () => {
    await etudiantsLicenceComponentsPage.clickOnCreateButton();
    etudiantsLicenceUpdatePage = new EtudiantsLicenceUpdatePage();
    expect(await etudiantsLicenceUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /pfumv10App.etudiantsLicence.home.createOrEditLabel/
    );
    await etudiantsLicenceUpdatePage.cancel();
  });

  it('should create and save EtudiantsLicences', async () => {
    async function createEtudiantsLicence() {
      await etudiantsLicenceComponentsPage.clickOnCreateButton();
      await etudiantsLicenceUpdatePage.setSuffixeInput('suffixe');
      expect(await etudiantsLicenceUpdatePage.getSuffixeInput()).to.match(/suffixe/);
      await etudiantsLicenceUpdatePage.setNomInput('nom');
      expect(await etudiantsLicenceUpdatePage.getNomInput()).to.match(/nom/);
      await etudiantsLicenceUpdatePage.setPrenomInput('prenom');
      expect(await etudiantsLicenceUpdatePage.getPrenomInput()).to.match(/prenom/);
      await etudiantsLicenceUpdatePage.setDateNaissanceInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await etudiantsLicenceUpdatePage.getDateNaissanceInput()).to.contain('2001-01-01T02:30');
      await etudiantsLicenceUpdatePage.setAdresseContactInput('adresseContact');
      expect(await etudiantsLicenceUpdatePage.getAdresseContactInput()).to.match(/adresseContact/);
      await etudiantsLicenceUpdatePage.setVilleInput('ville');
      expect(await etudiantsLicenceUpdatePage.getVilleInput()).to.match(/ville/);
      await etudiantsLicenceUpdatePage.setEmailInput('email');
      expect(await etudiantsLicenceUpdatePage.getEmailInput()).to.match(/email/);
      await etudiantsLicenceUpdatePage.pjBacSelectLastOption();
      await etudiantsLicenceUpdatePage.mentionSelectLastOption();
      await etudiantsLicenceUpdatePage.setCinPassInput('cinPass');
      expect(await etudiantsLicenceUpdatePage.getCinPassInput()).to.match(/cinPass/);
      await etudiantsLicenceUpdatePage.setPaysNationaliteInput('paysNationalite');
      expect(await etudiantsLicenceUpdatePage.getPaysNationaliteInput()).to.match(/paysNationalite/);
      await etudiantsLicenceUpdatePage.setPaysResidenceInput('paysResidence');
      expect(await etudiantsLicenceUpdatePage.getPaysResidenceInput()).to.match(/paysResidence/);
      await etudiantsLicenceUpdatePage.setCodepostalInput('codepostal');
      expect(await etudiantsLicenceUpdatePage.getCodepostalInput()).to.match(/codepostal/);
      await etudiantsLicenceUpdatePage.setProvinceInput('province');
      expect(await etudiantsLicenceUpdatePage.getProvinceInput()).to.match(/province/);
      await etudiantsLicenceUpdatePage.setTelInput('5');
      expect(await etudiantsLicenceUpdatePage.getTelInput()).to.eq('5');
      await etudiantsLicenceUpdatePage.setPhotoInput(absolutePath);
      await etudiantsLicenceUpdatePage.setExtraitActeNaissanceInput(absolutePath);
      await etudiantsLicenceUpdatePage.setBacalaureatInput(absolutePath);
      await etudiantsLicenceUpdatePage.setCinPassportInput(absolutePath);
      const selectedInscriptionvalide = await etudiantsLicenceUpdatePage.getInscriptionvalideInput().isSelected();
      if (selectedInscriptionvalide) {
        await etudiantsLicenceUpdatePage.getInscriptionvalideInput().click();
        expect(await etudiantsLicenceUpdatePage.getInscriptionvalideInput().isSelected()).to.be.false;
      } else {
        await etudiantsLicenceUpdatePage.getInscriptionvalideInput().click();
        expect(await etudiantsLicenceUpdatePage.getInscriptionvalideInput().isSelected()).to.be.true;
      }
      const selectedAbsent = await etudiantsLicenceUpdatePage.getAbsentInput().isSelected();
      if (selectedAbsent) {
        await etudiantsLicenceUpdatePage.getAbsentInput().click();
        expect(await etudiantsLicenceUpdatePage.getAbsentInput().isSelected()).to.be.false;
      } else {
        await etudiantsLicenceUpdatePage.getAbsentInput().click();
        expect(await etudiantsLicenceUpdatePage.getAbsentInput().isSelected()).to.be.true;
      }
      await etudiantsLicenceUpdatePage.userSelectLastOption();
      await etudiantsLicenceUpdatePage.filiereSelectLastOption();
      await etudiantsLicenceUpdatePage.anneeInscriptionSelectLastOption();
      await etudiantsLicenceUpdatePage.modaliteSelectLastOption();
      await waitUntilDisplayed(etudiantsLicenceUpdatePage.getSaveButton());
      await etudiantsLicenceUpdatePage.save();
      await waitUntilHidden(etudiantsLicenceUpdatePage.getSaveButton());
      expect(await etudiantsLicenceUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createEtudiantsLicence();
    await etudiantsLicenceComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await etudiantsLicenceComponentsPage.countDeleteButtons();
    await createEtudiantsLicence();

    await etudiantsLicenceComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await etudiantsLicenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last EtudiantsLicence', async () => {
    await etudiantsLicenceComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await etudiantsLicenceComponentsPage.countDeleteButtons();
    await etudiantsLicenceComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    etudiantsLicenceDeleteDialog = new EtudiantsLicenceDeleteDialog();
    expect(await etudiantsLicenceDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/pfumv10App.etudiantsLicence.delete.question/);
    await etudiantsLicenceDeleteDialog.clickOnConfirmButton();

    await etudiantsLicenceComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await etudiantsLicenceComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
