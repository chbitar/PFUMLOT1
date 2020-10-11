import { Moment } from 'moment';
import { IEspaceEtudiant } from 'app/shared/model/espace-etudiant.model';
import { IModule } from 'app/shared/model/module.model';
import { IAnneeInscription } from 'app/shared/model/annee-inscription.model';
import { ITableauDeBoard } from 'app/shared/model/tableau-de-board.model';

export interface ICalendrierModule {
  id?: number;
  libelle?: string;
  dateControlContinu1?: Moment;
  dateControlContinu2?: Moment;
  espaceEtudiants?: IEspaceEtudiant[];
  module?: IModule;
  anneeInscription?: IAnneeInscription;
  boards?: ITableauDeBoard[];
}

export const defaultValue: Readonly<ICalendrierModule> = {};
