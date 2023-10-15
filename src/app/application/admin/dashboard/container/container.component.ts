import { Component, OnInit } from '@angular/core';
import { Observable, timeInterval, timeout, timestamp } from 'rxjs';
import { Terrain } from 'src/app/_core/models/terrain';
import { ClientService } from 'src/app/_core/service/client.service';
import { ConstructionService } from 'src/app/_core/service/construction.service';
import { EmployerService } from 'src/app/_core/service/employer.service';
import { FournisseurService } from 'src/app/_core/service/fournisseur.service';
import { TerrainService } from 'src/app/_core/service/terrain.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit{

	terrains:Terrain|any;
	client:number|any = 0;
	employer:number|any = 0;
	fournisseur:number|any = 0;
	batement:number|any = 0;
	chartOptions = {};
	chartOptionsdate = {};
	constructor(
		private serviceConstruction:ConstructionService,
		private serviceTerrain:TerrainService,
		private serviceClient:ClientService,
		private serviceEmployer:EmployerService,
		private serviceFournisseur:FournisseurService){
		
	}
	ngOnInit(): void {
		let r2 = 0;
		let r3 = 0;
		let r4 = 0;
		let r5 = 0;
		let r6 = 0;
		let som = 0;
		this.serviceTerrain.getTerrains().subscribe(res =>{
			this.terrains = res;
			this.batement = res.length;
			for (let index = 0; index < res.length; index++) {
				const element = res[index];
				switch (element.etage) {
					case "R+2": r2+=1;					
						break;
					case "R+3": r3+=1;					
						break;
					case "R+4": r4+=1;					
						break;
					case "R+5": r5+=1;					
						break;
					case "R+6": r6+=1;					
						break;
					default:
						break;
				}

			}
			som = res.length;
			
			this.chartOptions = {
				animationEnabled: true,
				title:{
				  text: "Répartition des projets de construction"
				},
				data: [{
				  type: "doughnut",
				  yValueFormatString: "#,###.##'%'",
				  indexLabel: "{name}",
				  dataPoints:[
					{ y: (r2/som)*100, name: "R+2" },
					{ y: (r3/som)*100, name: "R+3" },
					{ y: (r4/som)*100, name: "R+4" },
					{ y: (r5/som)*100, name: "R+5" },
					{ y: (r6/som)*100, name: "R+6" },
				  ]
				}]
			  }
			
			console.log(this.terrains);
			
		});

		this.serviceConstruction.getConstructions().subscribe(res =>{
			console.log(res);
		});
		this.serviceClient.getClients().subscribe(res =>{
			this.client = res.length;
		});

		this.serviceEmployer.getEmployers().subscribe(res =>{
			this.employer = res.length;
		});

		this.serviceFournisseur.getFournisseurs().subscribe(res =>{
			this.fournisseur = res.length;
		});

		this.serviceConstruction.constructionParAnnnee().subscribe(res =>{
			console.log(res);

			let data = [{x: new Date('2008-02-01'), y: 1}];
			for (let index = 0; index < res.length; index++) {
				const element = res[index];
				data.push({x: new Date(element.split(',')[0].toString()), y:  Number(element.split(',')[1])});
			}
			
			
			this.chartOptionsdate = {
				animationEnabled: true,
				theme: "light2",
				title: {
					text: "Les Constructions Annuelles "
				},
				axisX: {
					valueFormatString: "YYYY",
					intervalType: "year",
					interval: 5
				},
				axisY: {
					title: "Constructions",
				  suffix: ""
				},
				toolTip: {
					shared: true
				},
				legend: {
					cursor: "pointer",
					itemclick: function(e: any){
						if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
							e.dataSeries.visible = false;
						} else{
							e.dataSeries.visible = true;
						}
						e.chart.render();
					}
				},
				data: [
				{
					type: "line",
					name: "Construction",
					showInLegend: true,
					yValueFormatString: "#,N°###",
					dataPoints: data
				}]
			}
			

		});

	
	}

  	

	getNombreEtage(r:string):number{
		let nb = 0;
		
		for (let index = 0; index < this.terrains.length; index++) {
			const element = this.terrains[index];
			if(element.etage == r){
				nb+=1;
			}
		}
		return nb;
	}

 
}
