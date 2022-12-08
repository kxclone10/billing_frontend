import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Facture } from '../facture';
import { FactureService } from '../facture.service';

@Component({
  selector: 'app-facture-details',
  templateUrl: './facture-details.component.html',
  styleUrls: ['./facture-details.component.css']
})
export class FactureDetailsComponent implements OnInit {

  factures : any;
  liste_factures : any =[];
  liste_produits : any =[];
  id : string ='';
  facture : any;

  constructor(private route: ActivatedRoute,private facturedetailsservice : FactureService) { }

  ngOnInit(): void {
    /*this.getBilling();*/
    /*this.id = this.route.snapshot.params['id'];*/
    this.factures = new Facture();
    this.facturedetailsservice.getBillingById(this.id).subscribe( data => {
      this.factures = data;
      console.log(data);
    });
  }
  private getBilling(){
    this.facturedetailsservice.getBillingOfUser().subscribe(data=>{
      this.factures = data;
    });
  }

}
