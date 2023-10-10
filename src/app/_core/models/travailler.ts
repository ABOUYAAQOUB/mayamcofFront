import { Construction } from "./construction";
import { Employer } from "./employer";
import { Terrain } from "./terrain";

export interface Travailler {
    id:Number;
	// non null
	 datedebut:Date;
	// non null et datedebut < datefin
	datefin:Date;
	
	
	construction:Construction;
	
	
	employer:Employer;
}
