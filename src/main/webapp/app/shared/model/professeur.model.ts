import { IUser } from 'app/shared/model/user.model';
import { IAffectationModule } from 'app/shared/model/affectation-module.model';

export interface IProfesseur {
  id?: number;
  nom?: string;
  prenom?: string;
  etablissement?: string;
  grade?: string;
  diplome?: string;
  cin?: string;
  rib?: string;
  email?: string;
  user?: IUser;
  affectationModules?: IAffectationModule[];
}

export const defaultValue: Readonly<IProfesseur> = {};
