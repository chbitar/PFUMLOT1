import { IEtudiantsExecutif } from 'app/shared/model/etudiants-executif.model';

export interface IAutreDoc {
  id?: number;
  titre?: string;
  dataContentType?: string;
  data?: any;
  etudiantexec?: IEtudiantsExecutif;
}

export const defaultValue: Readonly<IAutreDoc> = {};
