import { IEtudiantsExecutif } from 'app/shared/model/etudiants-executif.model';
import { IEtudiantsLicence } from 'app/shared/model/etudiants-licence.model';
import { IEtudiantsMaster } from 'app/shared/model/etudiants-master.model';
import { IModule } from 'app/shared/model/module.model';
import { IEtablissement } from 'app/shared/model/etablissement.model';
import { ITableauDeBoard } from 'app/shared/model/tableau-de-board.model';

export const enum Programme {
  LICENCE = 'LICENCE',
  MASTER = 'MASTER',
  MASTER_EXECUTIF = 'MASTER_EXECUTIF'
}

export interface IFiliere {
  id?: number;
  nomfiliere?: string;
  responsable?: string;
  accreditaion?: string;
  programme?: Programme;
  etudiantsExecutifs?: IEtudiantsExecutif[];
  etudiantsLicences?: IEtudiantsLicence[];
  etudiantsMasters?: IEtudiantsMaster[];
  modules?: IModule[];
  etablissement?: IEtablissement;
  boards?: ITableauDeBoard[];
}

export const defaultValue: Readonly<IFiliere> = {};
