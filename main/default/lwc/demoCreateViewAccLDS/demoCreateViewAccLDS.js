import { LightningElement,track } from 'lwc';

export default class DemoCreateViewAccLDS extends LightningElement {
@track recordId;

    handleSuccess(event){
        this.recordId = event.detail.id;
    }
}