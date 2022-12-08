import { Component, OnInit , Inject } from '@angular/core';
import { FactureService } from '../facture.service';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { FactureDetailsComponent } from '../facture-details/facture-details.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Router, withEnabledBlockingInitialNavigation } from '@angular/router';
import { PaymentComponent } from '../payment/payment.component';
import { ListKeyManager } from '@angular/cdk/a11y';
import { Facture } from '../facture';
import { withLatestFrom } from 'rxjs';
import { FactureStatus } from '../facture-status';


@Component({
  selector: 'app-factures',
  templateUrl: './factures.component.html',
  styleUrls: ['./factures.component.css']
})
export class FacturesComponent implements OnInit {

  factures : any;
  status : any = [];
  liste_factures : any = [];
  facture : Facture = new Facture();
  color : string = '#ffbb4f';
  value = FactureStatus.PAYE;
  showPaymentButton : boolean | undefined;
  modalRef: MdbModalRef<FactureDetailsComponent> | null = null;

  constructor(private dialog : MatDialog ,public factureservice : FactureService,private modalService:MdbModalService, private router : Router) { }

  ngOnInit(): void {
    this.getBilling();
   
   
    
  }

  private getBilling(){
    this.factureservice.getBillingOfUser().subscribe(data=>{
      this.factures = data;
      for(let facture of this.factures){
        this.liste_factures.push(facture);
        if(facture.status == this.value){
          this.showPaymentButton = true;
        }
        else {
          this.showPaymentButton = false;
        }
      }
    });
   
    
}

getbillingtopay(id:string){
  console.log(id);
}
getfactureByid(id:string){
    this.router.navigate(['facture-details', id]);
}

onOpenDialog(id:string){

    /*this.dialog.open(FactureDetailsComponent,{
      height:'100%',
      width:'50%',
  
    });*/
    
    /*this.modalRef = this.modalService.open(FactureDetailsComponent)*/
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.id = "modal-component";
    /*dialogConfig.height = "750px";*/
    dialogConfig.width = "840px";
    dialogConfig.maxHeight = "700px";
  
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.dialog.open(FactureDetailsComponent, dialogConfig);
    modalDialog.componentInstance.id = id;

}
OpenPaymentPage(id:string){
  const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.id = "modal-component";
    dialogConfig.height = "450px";
    dialogConfig.width = "850px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.dialog.open(PaymentComponent, dialogConfig);
    modalDialog.componentInstance.id = id;
    /*this.router.navigate(['payment', id]);*/
}
/*hidePaymentButton(){
  
}*/
}
