import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { Contrat } from 'src/app/_core/models/contrat';
import { Terrain } from 'src/app/_core/models/terrain';
import { ContratService } from 'src/app/_core/service/contrat.service';
import { TerrainService } from 'src/app/_core/service/terrain.service';
import { EditComponentP } from 'src/app/_shear/dialog/edit/edit.component';

export interface FileUplod{
  name:string;
  file:File
}
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
  
  base64:string|any;
  base64Output : string|any = '';
  selectedFiles:string|any;
  contentType:string = "application/pdf";
  checkparam:number|any;
  contrat:Contrat|any;
  terrains:Terrain|any;
  fileUplod:FileUplod|any;
  //file:File|any;
  constructor(private _snackBar: MatSnackBar,private serviceContrat:ContratService,private serviceTerrain:TerrainService,private route:Router,private routeparam:ActivatedRoute,private builder:FormBuilder){}
  
  ngOnInit(): void {
    this.checkparam = this.routeparam.snapshot.paramMap.get("id");
    if(this.checkparam){
      const fakeFile = new File([""], "example.txt", { type: "text/plain" });
      this.getContart();
      this.getTerrainsUpdate(this.checkparam);
      
    }else{
      this.getTerrains();
    }
    
    
  }

  openSnackBar(name:string) {
    this._snackBar.openFromComponent(EditComponentP, {
      duration: 1000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
      data: 'Le Contrat a éte Bien '+name
    });

  }

  getContart(){
    this.serviceContrat.getContrat(this.checkparam).subscribe(res =>{console.log("Sa");console.log(res);
    this.base64Output = res.contratpdf;
    this.registerForm.setValue({
      date: new Date(res.datecontrat),
      terrain:res.terrain.id,
      file:{name:res.id+"Contrat"+new Date(res.datecontrat)},
     
    });
  
  });
  }

  sub(){
    if(this.registerForm.valid){
      this.contrat = {
        datecontrat:this.registerForm.get('date')?.value,
        contratpdf:this.base64Output,
        terrain:{id:this.registerForm.get('terrain')?.value}
      };

      if(this.checkparam){
        this.contrat.id = this.checkparam;
        this. updaterContrat(this.contrat)
      }else{
        this.ajouterContrat(this.contrat);
      }
      this.retourn();
    }
  }

  ajouterContrat(contrat:Contrat){
    this.serviceContrat.addContrat(contrat).subscribe(res =>{
      console.log(res);
      this.openSnackBar("Ajouter");
    });
  }

  updaterContrat(contrat:Contrat){
   this.serviceContrat.updateContrat(contrat).subscribe(res =>{
          console.log(res);
          this.openSnackBar("Modifier");
    });
  }

  retourn(){
    this.route.navigateByUrl('mayamcof/admin/contrat');
  }

  registerForm:FormGroup = this.builder.group({
    date:new FormControl('',Validators.compose([Validators.required])),
    terrain: new FormControl('',Validators.compose([Validators.required])),
    file:['',Validators.required],
  });

  getTerrains(){
    this.serviceTerrain.getTerrainWithAnyContrat().subscribe(res =>{
      this.terrains = res;
      console.log(this.terrains);
    });
  }
  getTerrainsUpdate(id:number){
    this.serviceTerrain.getTerrainUpdate(id).subscribe(res =>{
      this.terrains = res;
    });
  }
  
  onFileSelected(event:Event) {
    this.selectedFiles = (event.target as HTMLInputElement).files?.item(0)?.name;
    this.registerForm.get('file')?.setValue({name:this.selectedFiles})
    let file:File|any = (event.target as HTMLInputElement).files?.item(0);
    console.log((event.target as HTMLInputElement).files?.item(0));
    this.convertFile(file).subscribe((base64:any) => {
      this.base64Output = base64;
      console.log(this.base64Output);
    });

    
    console.log("ok");
    
  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event:any) => result.next(btoa(event.target.result.toString()));
    return result;
  }

  affichier64(){
    console.log(this.base64Output);
  }

  base64toBlob(base64Data: string, contentType: string): Blob {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    return new Blob(byteArrays, { type: contentType });
  }

  downloadFile() {
    const blob = this.base64toBlob(this.base64Output, this.contentType);
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'file.pdf'; // Specify the desired file name with appropriate extension
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
  
}
