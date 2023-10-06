import { Facture } from "./facture";
import { Tache } from "./tache";
import { Terrain } from "./terrain";

export interface Construction {
    id:Number;
	
	unite:string;

	quantite:Number;

	prix:Number;

	 confirmer:boolean;
	
	terrain:Terrain;	
	
	tache:Tache;	
	
    facture:Facture;
}
