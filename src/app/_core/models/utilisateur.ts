export interface Utilisateur {
    id:Number;
	nom:String;
	username:String;
	password:String;
	// si true admin / false user
	role:boolean;
}
