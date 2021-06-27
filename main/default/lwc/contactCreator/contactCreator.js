import { LightningElement, api } from 'lwc';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CONTACT_OBJ from '@salesforce/schema/Contact';
import First_Name from '@salesforce/schema/Contact.FirstName';
import Last_Name from '@salesforce/schema/Contact.LastName';
import Email from '@salesforce/schema/Contact.Email';
export default class RecordFormEditExample extends LightningElement {
    // The record page provides recordId and objectApiName
    @api recordId;
    objectApiName = CONTACT_OBJ;
    fields = [First_Name, Last_Name, Email];

    handleSuccess(event) {
        const toastEvent = new ShowToastEvent({
            title: "Contact created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(toastEvent);
}
}