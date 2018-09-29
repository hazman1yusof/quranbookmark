import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the MyData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MyData {
  o_page: any;
  page: any;
  page_subs: any;
  page_obs: any;

  o_ppr:any;
  ppr:any;
  ppr_subs: any;
  ppr_obs: any;

  o_rpd:any;
  rpd:any;
  rpd_subs: any;
  rpd_obs: any;

  constructor(public storage: Storage) {
  	this.page_subs = Observable.create(observer => {
      this.page_obs = observer;
      this.page_obs.next(this.page);
    });
    this.page_subs.subscribe(value => {});


    this.ppr_subs = Observable.create(observer => {
      this.ppr_obs = observer;
      this.ppr_obs.next(this.ppr);
    });
    this.ppr_subs.subscribe(value => {});


    this.rpd_subs = Observable.create(observer => {
      this.rpd_obs = observer;
      this.rpd_obs.next(this.rpd);
    });
    this.rpd_subs.subscribe(value => {});

    this.init_val();
  }

  upd_page(val,skip=false){
    this.page = (skip)?val:parseInt(this.page)+parseInt(val);
    if(this.page>604)this.page=0;
    this.storage.set('page', this.page);
    this.page_obs.next(this.page);
  }

  upd_ppr(val){
    this.ppr = val;
    this.storage.set('ppr', val);
    this.ppr_obs.next(this.ppr);
  }

  upd_rpd(val){
    this.rpd = val;
    this.storage.set('rpd', val);
    this.rpd_obs.next(this.rpd);
  }

  init_val(){
  	this.storage.get('page').then((value)=>{
  	  if(value){
  	    this.page=value;
        this.o_page=value;
  	  }else{
  	    this.page=0;
        this.o_page=value;
  	  }
      this.page_obs.next(this.page);
  	});

    this.storage.get('ppr').then((value)=>{
      if(value){
        this.ppr=value;
        this.o_ppr=value;
      }else{
        this.ppr=0;
        this.o_ppr=0;
      }
      this.ppr_obs.next(this.ppr);
    });

    this.storage.get('rpd').then((value)=>{
      if(value){
        this.rpd=value;
        this.o_rpd=value;
      }else{
        this.rpd=0;
        this.o_rpd=0;
      }
      this.rpd_obs.next(this.rpd);
    });
  }

  reset(){
    this.upd_page(this.o_page,true);
    this.upd_ppr(this.o_ppr);
    this.upd_rpd(this.o_rpd);
  }

}
