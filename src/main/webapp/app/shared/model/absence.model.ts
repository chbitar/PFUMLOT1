import { Moment } from 'moment';
import { IEspaceEtudiant } from 'app/shared/model/espace-etudiant.model';
import { IUser } from 'app/shared/model/user.model';
import { IModule } from 'app/shared/model/module.model';
import { IEtudiantsLicence } from 'app/shared/model/etudiants-licence.model';
import { IEtudiantsMaster } from 'app/shared/model/etudiants-master.model';
import { IEtudiantsExecutif } from 'app/shared/model/etudiants-executif.model';

export interface IAbsence {
  id?: number;
  absent?: boolean;
  dateSeance?: Moment;
  espaceEtudiants?: IEspaceEtudiant[];
  user?: IUser;
  module?: IModule;
  etudiantsLicence?: IEtudiantsLicence;
  etudiantsMaster?: IEtudiantsMaster;
  etudiantsExecutif?: IEtudiantsExecutif;
}

export const defaultValue: Readonly<IAbsence> = {
  absent: false
};
