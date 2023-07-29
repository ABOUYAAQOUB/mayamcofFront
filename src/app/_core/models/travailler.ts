import { Employer } from "./employer";
import { Terrain } from "./terrain";

export interface Travailler {
    id:Number;
	// non null
	 datedebut:Date;
	// non null et datedebut < datefin
	datefin:Date;
	
	
	terrain:Terrain;
	
	
	employer:Employer;
}
