import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';
import { MyData } from '../../providers/my-data';

import moment from "moment";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  counter:any = 0;
  page:any;
  ppr:any = 0;
  rpd:any = 0;
  k_left:any;
  k_date:any;
  k_day:any;
  k_month:any;
  k_show:any;
  k_year:any;
  k_state:any = true;

  constructor(public navCtrl: NavController, public myData:MyData, public alertCtrl:AlertController) {
	myData.page_subs.subscribe(value => {
      this.page=value;
   	  this.calcPrediction();
    });

    myData.ppr_subs.subscribe(value => {
      this.ppr=value;
   	  this.calcPrediction();
    });

    myData.rpd_subs.subscribe(value => {
      this.rpd=value;
   	  this.calcPrediction();
    });
  }

  presentPrompt(val) {
    let alert = this.alertCtrl.create({
      title: (val=="ppr")? "How many pages you read on one sittings":"How many times per day you read",
      inputs: [
        {name: (val=="ppr")? "Pages":"Times",
        placeholder: (val=="ppr")? "Pages":"Times"}
      ],
      buttons: [
        {text: 'Set',
          handler: data => {
          	let dataval = (val=="ppr")?data.Pages:data.Times
            if(Number.isInteger(parseInt(dataval))){
              if(val=='ppr'){
              	this.ppr=data.Pages;
              	this.myData.upd_ppr(this.ppr);
              }else{
              	this.rpd=data.Times;
              	this.myData.upd_rpd(this.rpd);
              }
            }
          }
        },{text: 'Cancel',role: 'cancel'}
      ]
    });
    alert.present();
  }

  presentPrompt2() {
    let alert = this.alertCtrl.create({
      title: "Pages",
      inputs: [
        {name: "Pages", placeholder: "Pages"}
      ],
      buttons: [
        {text: 'Set',
          handler: data => {
            if(Number.isInteger(parseInt(data.Pages))){
             this.myData.upd_page(data.Pages,true);
            }
          }
        },{text: 'Cancel',role: 'cancel'}
      ]
    });
    alert.present();
  }

  adjust(val){
  	if(!val){
  		this.myData.upd_page(this.ppr)
  	}else{
  		this.myData.upd_page(val)
  	}
  }

  reset(){
  	this.myData.reset();
  }

  tukarDate(){
    if(this.k_state){this.k_state=false}else{this.k_state=true}
  }

  calcPrediction(){
  	this.k_left = Math.round((604-parseInt(this.page)) / parseInt(this.ppr) / parseInt(this.rpd));
  	let today = moment()
  	let kday = moment().add(this.k_left, 'days');
    this.k_date = kday.format("(ddd) D-MM-YYYY")
  	this.k_day = today.to(kday);

  	let freq = parseInt(this.ppr) * parseInt(this.rpd);
  	let freqpermonth = freq * 30;
  	let freqperyear = freq * 365;
  	this.k_month = (freqpermonth/604).toFixed(2) + " times";
  	this.k_year = (freqperyear/604).toFixed(2) + " times";
  }

}
