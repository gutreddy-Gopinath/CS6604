import { LightningElement, track } from 'lwc';

export default class TestForm extends LightningElement {
    @track varName = 'test';
    
    handleName(event){
        this.varName = event.target.value;
    }
}
