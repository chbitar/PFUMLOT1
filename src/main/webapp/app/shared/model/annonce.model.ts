import { IEspaceEtudiant } from 'app/shared/model/espace-etudiant.model';

export interface IAnnonce {
  id?: number;
  annonce?: any;
  commentaire?: any;
  espaceEtudiants?: IEspaceEtudiant[];
}

export const defaultValue: Readonly<IAnnonce> = {};
