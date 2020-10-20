import { IEtudiantsExecutif } from 'app/shared/model/etudiants-executif.model';
import { IEtudiantsLicence } from 'app/shared/model/etudiants-licence.model';
import { IEtudiantsMaster } from 'app/shared/model/etudiants-master.model';

export const enum Devise {
  MAD = 'MAD',
  USD = 'USD'
}

export interface IModalitePaiement {
  id?: number;
  modalite?: string;
  coutProgrammettc?: number;
  coutProgrammettcDevise?: number;
  remiseNiveau1?: number;
  remiseNiveau2?: number;
  devise?: Devise;
  etudiantsExecutifs?: IEtudiantsExecutif[];
  etudiantsLicences?: IEtudiantsLicence[];
  etudiantsMasters?: IEtudiantsMaster[];
}

export const defaultValue: Readonly<IModalitePaiement> = {};
