import { LightningElement } from 'lwc';

export default class PublicParent extends LightningElement {
    meetingRoomInfo = [
        {roomName:'01',roomCapacity:'12'},
        {roomName:'02',roomCapacity:'10'},
        {roomName:'03',roomCapacity:'16'},
        {roomName:'04',roomCapacity:'12'},
    ];
    
}