import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Construction } from 'src/app/_core/models/construction';
import { Facture } from 'src/app/_core/models/facture';
import { Terrain } from 'src/app/_core/models/terrain';
import { ConstructionService } from 'src/app/_core/service/construction.service';

@Component({
  selector: 'app-facture-pdf',
  templateUrl: './facture-pdf.component.html',
  styleUrls: ['./facture-pdf.component.css']
})
export class FacturePdfComponent implements OnInit {

  id:number|any;
  constructions:Construction[]|any;
  total:number=0;
  facture:Facture|any
  terrain:Terrain|any

  constructor(private constructionService:ConstructionService, 
              private routeparam:ActivatedRoute,) { }

  ngOnInit(): void {
    this.id = this.routeparam.snapshot.paramMap.get('id');
    this.getconstruction();
  }

  getconstruction(){
    this.constructionService.getConstructions().subscribe({
      next: data => {
        this.constructions = data.filter((construction:Construction)=>construction.facture!=null && construction.facture.id==this.id);
        this.terrain = this.constructions[0].terrain;
        this.facture = this.constructions[0].facture;
        this.constructions.forEach((element:Construction)=>{
          this.total+=Number(element.prix)*Number(element.quantite);
        })
        return this.total;
      },
      error: err => {
        console.log(err.error.message)
      }
    })
  }


  handleExport() {
    const invoiceContentElement=document.getElementById('invoice_container') as HTMLElement;
    html2canvas(invoiceContentElement,{scale: 4}).then(canvas=>{
      
      // is convert the canvas into base64 string url
      const imgData=canvas.toDataURL('image/jpeg');
      
      // page width
      const pageWidth=200;
     // const pageHeight=297;
      // calcuate the image actual height to fit with canvas and pdf
      const height=canvas.height*pageWidth/canvas.width;
      // initialize the PDF
      const pdf=new jsPDF("p","mm",[pageWidth, height]);
      // add the image into pdf
      pdf.addImage(imgData,'jpeg',0,0,pageWidth,height);

      pdf.save('Facture.pdf');
    })
  }

}
