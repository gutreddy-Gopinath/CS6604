import { LightningElement,track } from 'lwc';
import NameField from '@salesforce/schema/Account.Name';
import Phone from '@salesforce/schema/Account.Phone';

export default class DemoCreateAccountBaseComp extends LightningElement {

    @track recordId;
    //@track objectApiName=['Account'];

    fieldArray = [NameField,Phone];

    handleSubmit(event){
        this.recordId = event.detail.id;
    }
}