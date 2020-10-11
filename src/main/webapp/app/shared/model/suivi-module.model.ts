import { Moment } from 'moment';
import { IUser } from 'app/shared/model/user.model';
import { IModule } from 'app/shared/model/module.model';

export const enum Semestre {
  S1 = 'S1',
  S2 = 'S2',
  S3 = 'S3',
  S4 = 'S4',
  S5 = 'S5',
  S6 = 'S6'
}

export interface ISuiviModule {
  id?: number;
  semestre?: Semestre;
  descriptif?: any;
  observations?: any;
  date?: Moment;
  debutCreneau?: Moment;
  finCreneau?: Moment;
  duree?: number;
  user?: IUser;
  module?: IModule;
}

export const defaultValue: Readonly<ISuiviModule> = {};
