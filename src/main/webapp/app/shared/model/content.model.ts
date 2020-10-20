import { IAutreDoc } from 'app/shared/model/autre-doc.model';

export interface IContent {
  id?: number;
  dataContentType?: string;
  data?: any;
  autredoc?: IAutreDoc;
}

export const defaultValue: Readonly<IContent> = {};
