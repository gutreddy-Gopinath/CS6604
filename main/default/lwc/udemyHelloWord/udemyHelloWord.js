import { LightningElement, track } from 'lwc';

export default class UdemyHelloWord extends LightningElement {
   @track dynamictag =', Welcome !!';

   testGreeting(event){
       this.dynamictag = event.target.value;
   }
}