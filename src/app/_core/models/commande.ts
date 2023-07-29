import { Fournisseur } from "./fournisseur";

export interface Commande {

    id:Number;

	datecommande:Date;

    fournisseur:Fournisseur;
}
