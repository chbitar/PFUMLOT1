import { IEtudiantsLicence } from 'app/shared/model/etudiants-licence.model';
import { IEtudiantsMaster } from 'app/shared/model/etudiants-master.model';
import { IEtudiantsExecutif } from 'app/shared/model/etudiants-executif.model';

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
  etudiantsLicences?: IEtudiantsLicence[];
  etudiantsMasters?: IEtudiantsMaster[];
  etudiantsExecutifs?: IEtudiantsExecutif[];
}

export const defaultValue: Readonly<IModalitePaiement> = {};
