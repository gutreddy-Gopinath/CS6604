import { LightningElement, track, wire,api } from 'lwc';
import getCars from '@salesforce/apex/CarSearchResultController.getCars';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class CarSearchResult extends LightningElement {

    @api carTypeId;
    @track car;
    @wire(getCars, {carTypeId:'$carTypeId'})
    wiredCars({data,error}){
        if(data){
            this.car=data;
        }
        else if(error){
            this.ShowToastEvent('ERROR',error.message.body,'error');
        }
    }
    ShowToastEvent(title,message,variant){
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant:variant,
        });
        this.dispatchEvent(event);
    }

    get responseCar(){
        if(this.car){
            return true;
        }
        return false;
    }
    
}