import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import absence, {
  AbsenceState
} from 'app/entities/absence/absence.reducer';
// prettier-ignore
import affectationModule, {
  AffectationModuleState
} from 'app/entities/affectation-module/affectation-module.reducer';
// prettier-ignore
import anneeInscription, {
  AnneeInscriptionState
} from 'app/entities/annee-inscription/annee-inscription.reducer';
// prettier-ignore
import calendrierModule, {
  CalendrierModuleState
} from 'app/entities/calendrier-module/calendrier-module.reducer';
// prettier-ignore
import etudiantsExecutif, {
  EtudiantsExecutifState
} from 'app/entities/etudiants-executif/etudiants-executif.reducer';
// prettier-ignore
import etudiantsLicence, {
  EtudiantsLicenceState
} from 'app/entities/etudiants-licence/etudiants-licence.reducer';
// prettier-ignore
import etudiantsMaster, {
  EtudiantsMasterState
} from 'app/entities/etudiants-master/etudiants-master.reducer';
// prettier-ignore
import filiere, {
  FiliereState
} from 'app/entities/filiere/filiere.reducer';
// prettier-ignore
import module, {
  ModuleState
} from 'app/entities/module/module.reducer';
// prettier-ignore
import professeur, {
  ProfesseurState
} from 'app/entities/professeur/professeur.reducer';
// prettier-ignore
import suiviModule, {
  SuiviModuleState
} from 'app/entities/suivi-module/suivi-module.reducer';
// prettier-ignore
import etablissement, {
  EtablissementState
} from 'app/entities/etablissement/etablissement.reducer';
// prettier-ignore
import modalitePaiement, {
  ModalitePaiementState
} from 'app/entities/modalite-paiement/modalite-paiement.reducer';
// prettier-ignore
import espaceEtudiant, {
  EspaceEtudiantState
} from 'app/entities/espace-etudiant/espace-etudiant.reducer';
// prettier-ignore
import annonce, {
  AnnonceState
} from 'app/entities/annonce/annonce.reducer';
// prettier-ignore
import noteLicence, {
  NoteLicenceState
} from 'app/entities/note-licence/note-licence.reducer';
// prettier-ignore
import noteMaster, {
  NoteMasterState
} from 'app/entities/note-master/note-master.reducer';
// prettier-ignore
import noteExecutif, {
  NoteExecutifState
} from 'app/entities/note-executif/note-executif.reducer';
// prettier-ignore
import tableauDeBoard, {
  TableauDeBoardState
} from 'app/entities/tableau-de-board/tableau-de-board.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly absence: AbsenceState;
  readonly affectationModule: AffectationModuleState;
  readonly anneeInscription: AnneeInscriptionState;
  readonly calendrierModule: CalendrierModuleState;
  readonly etudiantsExecutif: EtudiantsExecutifState;
  readonly etudiantsLicence: EtudiantsLicenceState;
  readonly etudiantsMaster: EtudiantsMasterState;
  readonly filiere: FiliereState;
  readonly module: ModuleState;
  readonly professeur: ProfesseurState;
  readonly suiviModule: SuiviModuleState;
  readonly etablissement: EtablissementState;
  readonly modalitePaiement: ModalitePaiementState;
  readonly espaceEtudiant: EspaceEtudiantState;
  readonly annonce: AnnonceState;
  readonly noteLicence: NoteLicenceState;
  readonly noteMaster: NoteMasterState;
  readonly noteExecutif: NoteExecutifState;
  readonly tableauDeBoard: TableauDeBoardState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  absence,
  affectationModule,
  anneeInscription,
  calendrierModule,
  etudiantsExecutif,
  etudiantsLicence,
  etudiantsMaster,
  filiere,
  module,
  professeur,
  suiviModule,
  etablissement,
  modalitePaiement,
  espaceEtudiant,
  annonce,
  noteLicence,
  noteMaster,
  noteExecutif,
  tableauDeBoard,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
