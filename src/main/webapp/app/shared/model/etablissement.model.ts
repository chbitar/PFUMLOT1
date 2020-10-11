import { IFiliere } from 'app/shared/model/filiere.model';

export interface IEtablissement {
  id?: number;
  nomEcole?: string;
  adresse?: string;
  rc?: string;
  ice?: string;
  tp?: string;
  identiteFiche?: string;
  logoContentType?: string;
  logo?: any;
  filieres?: IFiliere[];
}

export const defaultValue: Readonly<IEtablissement> = {};
