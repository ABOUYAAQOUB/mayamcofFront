import { Terrain } from "./terrain";

export interface Contrat {
    id:Number;

	datecontrat:Date;
	// la taille ne depace pas deux mega	
	contratpdf:String;	
	
	terrain:Terrain;
}
