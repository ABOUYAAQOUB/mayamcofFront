import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/_core/models/client';
import { Terrain } from 'src/app/_core/models/terrain';
import { ClientService } from 'src/app/_core/service/client.service';
import { TerrainService } from 'src/app/_core/service/terrain.service';
import { EditComponentP } from 'src/app/_shear/dialog/edit/edit.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  Terrain:Terrain|any;
  clients:Client[]|any;
  id:number|any;
  constructor(private _snackBar: MatSnackBar,private builder:FormBuilder, private TerrainService:TerrainService, private clientService:ClientService, private activeRoute: ActivatedRoute, private router:Router){}
  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    if(this.id){
      this.getTerrain();
    }
    this.clientService.getClients().subscribe(res=>{
      console.log(res);
      this.clients = res;
    });
  }

  openSnackBar(name:string) {
    this._snackBar.openFromComponent(EditComponentP, {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
      data: 'le Terrain a éte Bien '+name
    });

  }

  registerForm:FormGroup = this.builder.group({
    surface:new FormControl('',Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])),
    etage:new FormControl(),
    adresse:new FormControl('',Validators.compose([Validators.required])),
    client:new FormControl('', Validators.compose([Validators.required]))
  });

  sub(){
      if(this.id!=null){
        this.updateTerrain();
        this.openSnackBar("Modifier");
      }else{
        this.addTerrain();
        this.openSnackBar("Ajouter");
      }
      
  }

  addTerrain(){
    this.Terrain = {
      surface:this.registerForm.get('surface')?.value,
      etage:this.registerForm.get('etage')?.value,
      adresse:this.registerForm.get('adresse')?.value,
      client:{id:this.registerForm.get('client')?.value}
    }
    console.log(this.Terrain);
    this.TerrainService.addTerrain(this.Terrain).subscribe( {next:data=>{
      this.router.navigateByUrl("mayamcof/admin/terrain");
    },
    error:err=>{
      
    }
    });
  }

  getTerrain(){
    this.TerrainService.getTerrain(this.id).subscribe(res=>{
      this.registerForm.setValue({
        surface:res.surface,
        etage:res.etage,
        adresse:res.adresse,
        client:res.client.id
      })
    })
  }

  updateTerrain(){
    this.Terrain = {
      id:this.id,
      surface:this.registerForm.get('surface')?.value,
      etage:this.registerForm.get('etage')?.value,
      adresse:this.registerForm.get('adresse')?.value,
      client:{id:this.registerForm.get('client')?.value}
    }
    this.TerrainService.updateTerrain(this.Terrain).subscribe(
      {next:data=>{
        this.router.navigateByUrl("mayamcof/admin/terrain");
      },
      error:err=>{
        
      }
      }
    );
  }
}
