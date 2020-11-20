import { Moment } from 'moment';
import { IModule } from 'app/shared/model/module.model';
import { IAbsence } from 'app/shared/model/absence.model';
import { IUser } from './user.model';

export const enum Programme {
  LICENCE = 'LICENCE',
  MASTER = 'MASTER',
  MASTER_EXECUTIF = 'MASTER_EXECUTIF'
}

export interface IFicheAbsence {
  id?: number;
  dateSeance?: Date;
  module?: IModule;
  programme?: Programme;
  absences?: IAbsence[];
  user?: IUser;
}

export const defaultValue: Readonly<IFicheAbsence> = {};
