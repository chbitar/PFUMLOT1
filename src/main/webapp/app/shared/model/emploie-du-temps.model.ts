export const enum Programme {
  LICENCE = 'LICENCE',
  MASTER = 'MASTER',
  MASTER_EXECUTIF = 'MASTER_EXECUTIF'
}

export interface IEmploieDuTemps {
  id?: number;
  emploieDuTempsContentType?: string;
  emploieDuTemps?: any;
  programme?: Programme;
}

export const defaultValue: Readonly<IEmploieDuTemps> = {};
