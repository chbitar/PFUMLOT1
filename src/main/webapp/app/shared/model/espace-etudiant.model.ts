import { IUser } from 'app/shared/model/user.model';
import { IEtudiantsLicence } from 'app/shared/model/etudiants-licence.model';
import { IEtudiantsMaster } from 'app/shared/model/etudiants-master.model';
import { IEtudiantsExecutif } from 'app/shared/model/etudiants-executif.model';
import { ICalendrierModule } from 'app/shared/model/calendrier-module.model';
import { IAbsence } from 'app/shared/model/absence.model';
import { IAnnonce } from 'app/shared/model/annonce.model';

export interface IEspaceEtudiant {
  id?: number;
  emploiDuTempsContentType?: string;
  emploiDuTemps?: any;
  user?: IUser;
  etudiantLicence?: IEtudiantsLicence;
  etudiantMaster?: IEtudiantsMaster;
  etudiantExecutif?: IEtudiantsExecutif;
  calendrier?: ICalendrierModule;
  absence?: IAbsence;
  annonce?: IAnnonce;
}

export const defaultValue: Readonly<IEspaceEtudiant> = {};
