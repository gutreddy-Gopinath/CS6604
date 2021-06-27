import { LightningElement, track, api } from 'lwc';

export default class PublicMethodChild extends LightningElement {
    @track  value=['red'];


    options = [
        {label :'Red Marker', value:'red'},
        {label :'blue Marker', value:'blue'},
        {label :'green Marker', value:'green'},
        {label :'yellow Marker', value:'yellow'},
        {label :'pink Marker', value:'pink'},
    ];

    @api selectCheckbox(checkBoxValue){
        const selectedCheckbox = this.options.find(checkbox => {
            return checkBoxValue === checkbox.value;
        })
        if(selectedCheckbox){
            this.value = selectedCheckbox.value;
            return "Checkbox found";
        }
        return "No checkbox found";
        
    }
}