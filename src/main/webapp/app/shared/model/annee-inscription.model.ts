import { ICalendrierModule } from 'app/shared/model/calendrier-module.model';
import { IEtudiantsExecutif } from 'app/shared/model/etudiants-executif.model';
import { IEtudiantsLicence } from 'app/shared/model/etudiants-licence.model';
import { IEtudiantsMaster } from 'app/shared/model/etudiants-master.model';

export interface IAnneeInscription {
  id?: number;
  annee?: string;
  calendrierModules?: ICalendrierModule[];
  etudiantsExecutifs?: IEtudiantsExecutif[];
  etudiantsLicences?: IEtudiantsLicence[];
  etudiantsMasters?: IEtudiantsMaster[];
}

export const defaultValue: Readonly<IAnneeInscription> = {};
