import { LightningElement } from 'lwc';
export default class App extends LightningElement {
  name = 'SPD New Bike';
  description = 'It is very quick and light';
  color='Blue';
  //picture = 'https://s3-us-west-1.amazonaws.com/sfdc-demo/ebikes/electrax4.jpg';
  picture = 'https://miro.medium.com/max/1320/1*Z2TZVEjRM6VSyVUcCwJWIg.jpeg';

  ready = false;
  connectedCallback(){
    setTimeout(() => {
        this.ready = true;
    }, 1000);
  }

   /*name = 'Electra X4';
   description = 'A sweet bike built for comfort.';
   category = 'Mountain';
   material = 'Steel';
   price = '$2,700';
   pictureUrl = 'https://s3-us-west-1.amazonaws.com/sfdc-demo/ebikes/electrax4.jpg';*/
 }