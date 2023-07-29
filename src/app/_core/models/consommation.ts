import { Construction } from "./construction";
import { Produit } from "./produit";

export interface Consommation {
    id:Number;
	// doit etre 0 > 
	 quantite:Number;	
	
	produit:Produit;	
	
	 construction:Construction;
}
