import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './user.service';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  userActivated = false;
  private activatedSub: Subscription;

  constructor(private userSer : UserService) {}

  ngOnInit() {
    this.activatedSub = this.userSer.activatedEmitter.subscribe(
     (didAct:boolean) => {
       this.userActivated = didAct;
     }
    );
  }

  ngOnDestroy(){
    this.activatedSub.unsubscribe();
  }


}
