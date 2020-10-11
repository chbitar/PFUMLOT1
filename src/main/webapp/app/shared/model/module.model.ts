import { IAbsence } from 'app/shared/model/absence.model';
import { IAffectationModule } from 'app/shared/model/affectation-module.model';
import { ICalendrierModule } from 'app/shared/model/calendrier-module.model';
import { ISuiviModule } from 'app/shared/model/suivi-module.model';
import { INoteLicence } from 'app/shared/model/note-licence.model';
import { INoteMaster } from 'app/shared/model/note-master.model';
import { INoteExecutif } from 'app/shared/model/note-executif.model';
import { IFiliere } from 'app/shared/model/filiere.model';

export const enum Semestre {
  S1 = 'S1',
  S2 = 'S2',
  S3 = 'S3',
  S4 = 'S4',
  S5 = 'S5',
  S6 = 'S6'
}

export interface IModule {
  id?: number;
  nomModule?: string;
  volumeHoraire?: number;
  semestre?: Semestre;
  absences?: IAbsence[];
  affectationModules?: IAffectationModule[];
  calendrierModules?: ICalendrierModule[];
  suiviModules?: ISuiviModule[];
  noteLicences?: INoteLicence[];
  noteMasters?: INoteMaster[];
  noteExecutifs?: INoteExecutif[];
  filiere?: IFiliere;
}

export const defaultValue: Readonly<IModule> = {};
