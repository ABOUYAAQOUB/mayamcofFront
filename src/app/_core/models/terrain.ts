import { Client } from "./client";
import { Contrat } from "./contrat";

export interface Terrain {
    id:Number;
	// 0 > 
	surface:Number;
	// R+2 -> R+6
	etage:String;
	// non null
	adresse:String;	
	
	client:Client;

    contrat:Contrat;
}
