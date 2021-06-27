import { LightningElement, api,wire } from 'lwc';
import {fireEvent} from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class demoRoomChild extends LightningElement {
    @api meetingRoomInfo ;

    @api showRoomInfo = false;

    @wire(CurrentPageReference) pageReference; 

    tileClickHandler(){
        const tileClicked = new CustomEvent('tileclick', {detail : this.meetingRoomInfo ,bubbles:true}); // Bubble needed only when doing it Programatically

        this.dispatchEvent(tileClicked);
        fireEvent(this.pageReference, 'pubsubtileclick', this.meetingRoomInfo);
    }
}