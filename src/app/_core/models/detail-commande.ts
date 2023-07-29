import { Commande } from "./commande";
import { Produit } from "./produit";

export interface DetailCommande {
    id:Number;
	// doit etre 0 >
	prix:Number;
	// doit etre 0 >
	quantite:Number;	
	
	commande:Commande;	

	produit:Produit;
}
