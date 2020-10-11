import { IModule } from 'app/shared/model/module.model';
import { IProfesseur } from 'app/shared/model/professeur.model';

export const enum Semestre {
  S1 = 'S1',
  S2 = 'S2',
  S3 = 'S3',
  S4 = 'S4',
  S5 = 'S5',
  S6 = 'S6'
}

export interface IAffectationModule {
  id?: number;
  annee?: string;
  semestre?: Semestre;
  module?: IModule;
  professeur?: IProfesseur;
}

export const defaultValue: Readonly<IAffectationModule> = {};
