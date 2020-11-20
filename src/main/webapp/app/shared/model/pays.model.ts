export interface IPays {
  id?: number;
  code?: string;
  alpha2?: string;
  alpha3?: string;
  nom_en_gb?: string;
  nom_fr_fr?: string;
}
export const defaultValue: Readonly<IPays> = {};
