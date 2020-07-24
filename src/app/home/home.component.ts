import { Component, OnInit,  OnDestroy} from '@angular/core';

import {interval, Subscription, Observable} from 'rxjs' ;

// importing operator as follow
import {map, filter} from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

  private Subscription: Subscription;

  constructor() { }
  

  ngOnInit() {
    // this.Subscription = interval(1000).subscribe(
    //   count => {
    //     console.log(count);
    //   }
    // )

    const customIntervalObservable = Observable.create(
      observer => {
        let count = 0;
        setInterval(()=>{
          observer.next(count);
          if (count === 2){
            observer.complete();
          }
          if(count > 3){
            observer.error(new Error('count is greater then 3'));
          }
          count++;}, 1000);
      }
    );

    // operator is performed on the observable which was iplemented above
    let transformedObservableOutput = customIntervalObservable.pipe(
      //transforming the items emitted by an Observable by applying a function to each item
      map((data: number) =>{
      let returnString = 'round: ' + (data+1);  // this is the function
      return returnString;
      }),

      //emit only those items from an Observable that pass a predicted test
      filter((data:number) => {
        return data > 0;  // this is the test
      })
    );

    this.Subscription = transformedObservableOutput.subscribe(
      // received from data observable // later from transformed observable   
      data => {
        console.log(data);
      },

      // received from error observable 
      error =>{
        console.log(error);
        alert(error.message);
      },

      // obtained from completion observable
      () => {
        console.log('completed');
      }
    );

  }

  ngOnDestroy():void {
    this.Subscription.unsubscribe();

  }



}
