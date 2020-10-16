export const enum TypeDocument {
  PROFESSEUR = 'PROFESSEUR',
  LICENCE = 'LICENCE',
  MASTER = 'MASTER',
  MASTER_EXECUTIF = 'MASTER_EXECUTIF'
}

export interface IDocument {
  id?: number;
  titre?: string;
  dataContentType?: string;
  data?: any;
  typeDocument?: TypeDocument;
}

export const defaultValue: Readonly<IDocument> = {};
