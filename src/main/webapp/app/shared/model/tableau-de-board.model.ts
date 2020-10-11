import { IFiliere } from 'app/shared/model/filiere.model';
import { ICalendrierModule } from 'app/shared/model/calendrier-module.model';

export interface ITableauDeBoard {
  id?: number;
  tableauDeBoard?: string;
  filiers?: IFiliere[];
  calendriers?: ICalendrierModule[];
}

export const defaultValue: Readonly<ITableauDeBoard> = {};
