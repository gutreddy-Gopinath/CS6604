import { LightningElement,track } from 'lwc';

export default class UdemyConditionalRendering extends LightningElement {
    @track Condition=false;
    @track Name;
    @track arrayCity=['HYD','GNT', 'DLH','JRC','MUM'];
    getthevalues(event){
        this.Condition = event.target.checked;
    }
    NameCapture(event){
        this.Name = event.target.value;
    }
}