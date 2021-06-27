import { LightningElement,wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountView.getAccounts'

export default class ViewAccountsWire extends LightningElement {
    @wire(getAccounts)
    accounts;

    get responseRec(){
        if(this.accounts){
            return true;
        }
        return false;
    }
}