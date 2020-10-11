import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { IAbsence } from 'app/shared/model/absence.model';
import { IEspaceEtudiant } from 'app/shared/model/espace-etudiant.model';
import { IFiliere } from 'app/shared/model/filiere.model';
import { IAnneeInscription } from 'app/shared/model/annee-inscription.model';
import { IModalitePaiement } from 'app/shared/model/modalite-paiement.model';

export const enum DiplomeBac {
  Sciences_De_La_Vie_Et_De_La_Terre = 'Sciences_De_La_Vie_Et_De_La_Terre',
  Sciences_Physiques_Et_Chimiques = 'Sciences_Physiques_Et_Chimiques',
  Sciences_Economiques = 'Sciences_Economiques',
  Techniques_De_Gestion_Et_Comptabilite = 'Techniques_De_Gestion_Et_Comptabilite'
}

export const enum Mention {
  Passable = 'Passable',
  Assez_bien = 'Assez_bien',
  Bien = 'Bien',
  Tres_bien = 'Tres_bien'
}

export interface IEtudiantsLicence {
  id?: number;
  suffixe?: string;
  nom?: string;
  prenom?: string;
  dateNaissance?: Moment;
  adresseContact?: string;
  ville?: string;
  email?: string;
  pjBac?: DiplomeBac;
  mention?: Mention;
  cinPass?: string;
  paysNationalite?: string;
  paysResidence?: string;
  codepostal?: string;
  province?: string;
  tel?: number;
  photoContentType?: string;
  photo?: any;
  extraitActeNaissanceContentType?: string;
  extraitActeNaissance?: any;
  bacalaureatContentType?: string;
  bacalaureat?: any;
  cinPassportContentType?: string;
  cinPassport?: any;
  inscriptionvalide?: boolean;
  absent?: boolean;
  user?: IUser;
  absences?: IAbsence[];
  espaceEtudiants?: IEspaceEtudiant[];
  filiere?: IFiliere;
  anneeInscription?: IAnneeInscription;
  modalite?: IModalitePaiement;
}

export const defaultValue: Readonly<IEtudiantsLicence> = {
  inscriptionvalide: false,
  absent: false
};
