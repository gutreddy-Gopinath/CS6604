import { LightningElement,track } from 'lwc';

export default class CarSearch extends LightningElement {
    @track carTypeId='';

    cartypeselectChangeHandler(event){
        this.carTypeId = event.detail;
    }
}