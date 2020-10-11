/* tslint:disable no-unused-expression */
import { browser, element, by, protractor } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import EtudiantsExecutifComponentsPage from './etudiants-executif.page-object';
import { EtudiantsExecutifDeleteDialog } from './etudiants-executif.page-object';
import EtudiantsExecutifUpdatePage from './etudiants-executif-update.page-object';
import { waitUntilDisplayed, waitUntilHidden } from '../../util/utils';
import path from 'path';

const expect = chai.expect;

describe('EtudiantsExecutif e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let etudiantsExecutifUpdatePage: EtudiantsExecutifUpdatePage;
  let etudiantsExecutifComponentsPage: EtudiantsExecutifComponentsPage;
  let etudiantsExecutifDeleteDialog: EtudiantsExecutifDeleteDialog;
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

  it('should load EtudiantsExecutifs', async () => {
    await navBarPage.getEntityPage('etudiants-executif');
    etudiantsExecutifComponentsPage = new EtudiantsExecutifComponentsPage();
    expect(await etudiantsExecutifComponentsPage.getTitle().getText()).to.match(/Etudiants Executifs/);
  });

  it('should load create EtudiantsExecutif page', async () => {
    await etudiantsExecutifComponentsPage.clickOnCreateButton();
    etudiantsExecutifUpdatePage = new EtudiantsExecutifUpdatePage();
    expect(await etudiantsExecutifUpdatePage.getPageTitle().getAttribute('id')).to.match(
      /pfumv10App.etudiantsExecutif.home.createOrEditLabel/
    );
    await etudiantsExecutifUpdatePage.cancel();
  });

  it('should create and save EtudiantsExecutifs', async () => {
    async function createEtudiantsExecutif() {
      await etudiantsExecutifComponentsPage.clickOnCreateButton();
      await etudiantsExecutifUpdatePage.setSuffixeInput('suffixe');
      expect(await etudiantsExecutifUpdatePage.getSuffixeInput()).to.match(/suffixe/);
      await etudiantsExecutifUpdatePage.setNomInput('nom');
      expect(await etudiantsExecutifUpdatePage.getNomInput()).to.match(/nom/);
      await etudiantsExecutifUpdatePage.setPrenomInput('prenom');
      expect(await etudiantsExecutifUpdatePage.getPrenomInput()).to.match(/prenom/);
      await etudiantsExecutifUpdatePage.setDateNaissanceInput('01/01/2001' + protractor.Key.TAB + '02:30AM');
      expect(await etudiantsExecutifUpdatePage.getDateNaissanceInput()).to.contain('2001-01-01T02:30');
      await etudiantsExecutifUpdatePage.setAdresseContactInput('adresseContact');
      expect(await etudiantsExecutifUpdatePage.getAdresseContactInput()).to.match(/adresseContact/);
      await etudiantsExecutifUpdatePage.setVilleInput('ville');
      expect(await etudiantsExecutifUpdatePage.getVilleInput()).to.match(/ville/);
      await etudiantsExecutifUpdatePage.setEmailInput('email');
      expect(await etudiantsExecutifUpdatePage.getEmailInput()).to.match(/email/);
      await etudiantsExecutifUpdatePage.pjBacSelectLastOption();
      await etudiantsExecutifUpdatePage.mentionSelectLastOption();
      await etudiantsExecutifUpdatePage.setCinPassInput('cinPass');
      expect(await etudiantsExecutifUpdatePage.getCinPassInput()).to.match(/cinPass/);
      await etudiantsExecutifUpdatePage.setPaysNationaliteInput('paysNationalite');
      expect(await etudiantsExecutifUpdatePage.getPaysNationaliteInput()).to.match(/paysNationalite/);
      await etudiantsExecutifUpdatePage.setPaysResidenceInput('paysResidence');
      expect(await etudiantsExecutifUpdatePage.getPaysResidenceInput()).to.match(/paysResidence/);
      await etudiantsExecutifUpdatePage.setCodepostalInput('codepostal');
      expect(await etudiantsExecutifUpdatePage.getCodepostalInput()).to.match(/codepostal/);
      await etudiantsExecutifUpdatePage.setProvinceInput('province');
      expect(await etudiantsExecutifUpdatePage.getProvinceInput()).to.match(/province/);
      await etudiantsExecutifUpdatePage.setTelInput('5');
      expect(await etudiantsExecutifUpdatePage.getTelInput()).to.eq('5');
      await etudiantsExecutifUpdatePage.setPhotoInput(absolutePath);
      await etudiantsExecutifUpdatePage.setExtraitActeNaissanceInput(absolutePath);
      await etudiantsExecutifUpdatePage.setBacalaureatInput(absolutePath);
      await etudiantsExecutifUpdatePage.setCinPassportInput(absolutePath);
      await etudiantsExecutifUpdatePage.setDiplomeInput(absolutePath);
      const selectedInscriptionvalide = await etudiantsExecutifUpdatePage.getInscriptionvalideInput().isSelected();
      if (selectedInscriptionvalide) {
        await etudiantsExecutifUpdatePage.getInscriptionvalideInput().click();
        expect(await etudiantsExecutifUpdatePage.getInscriptionvalideInput().isSelected()).to.be.false;
      } else {
        await etudiantsExecutifUpdatePage.getInscriptionvalideInput().click();
        expect(await etudiantsExecutifUpdatePage.getInscriptionvalideInput().isSelected()).to.be.true;
      }
      const selectedAbsent = await etudiantsExecutifUpdatePage.getAbsentInput().isSelected();
      if (selectedAbsent) {
        await etudiantsExecutifUpdatePage.getAbsentInput().click();
        expect(await etudiantsExecutifUpdatePage.getAbsentInput().isSelected()).to.be.false;
      } else {
        await etudiantsExecutifUpdatePage.getAbsentInput().click();
        expect(await etudiantsExecutifUpdatePage.getAbsentInput().isSelected()).to.be.true;
      }
      await etudiantsExecutifUpdatePage.userSelectLastOption();
      await etudiantsExecutifUpdatePage.filiereSelectLastOption();
      await etudiantsExecutifUpdatePage.anneeInscriptionSelectLastOption();
      await etudiantsExecutifUpdatePage.modaliteSelectLastOption();
      await waitUntilDisplayed(etudiantsExecutifUpdatePage.getSaveButton());
      await etudiantsExecutifUpdatePage.save();
      await waitUntilHidden(etudiantsExecutifUpdatePage.getSaveButton());
      expect(await etudiantsExecutifUpdatePage.getSaveButton().isPresent()).to.be.false;
    }

    await createEtudiantsExecutif();
    await etudiantsExecutifComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeCreate = await etudiantsExecutifComponentsPage.countDeleteButtons();
    await createEtudiantsExecutif();

    await etudiantsExecutifComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeCreate + 1);
    expect(await etudiantsExecutifComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
  });

  it('should delete last EtudiantsExecutif', async () => {
    await etudiantsExecutifComponentsPage.waitUntilLoaded();
    const nbButtonsBeforeDelete = await etudiantsExecutifComponentsPage.countDeleteButtons();
    await etudiantsExecutifComponentsPage.clickOnLastDeleteButton();

    const deleteModal = element(by.className('modal'));
    await waitUntilDisplayed(deleteModal);

    etudiantsExecutifDeleteDialog = new EtudiantsExecutifDeleteDialog();
    expect(await etudiantsExecutifDeleteDialog.getDialogTitle().getAttribute('id')).to.match(
      /pfumv10App.etudiantsExecutif.delete.question/
    );
    await etudiantsExecutifDeleteDialog.clickOnConfirmButton();

    await etudiantsExecutifComponentsPage.waitUntilDeleteButtonsLength(nbButtonsBeforeDelete - 1);
    expect(await etudiantsExecutifComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
