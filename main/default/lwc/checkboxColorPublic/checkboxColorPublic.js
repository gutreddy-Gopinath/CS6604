import { api, LightningElement,track } from 'lwc';

export default class CheckboxColorPublic extends LightningElement {
    @track value=['red'];

    options=[
        {label:'Red',value:'red'},
        {label:'Green',value:'green'},
        {label:'Yellow',value:'yellow'},
        {label:'Pink',value:'pink'},
    ];

    @api
    selectCheckbox(inputVal){
        const selectedCheckboxVal = this.options.find(checkboxVal =>{
            return inputVal === checkboxVal.value;
        })
        if(selectedCheckboxVal){
            this.value = selectedCheckboxVal.value;
            return "successfully found";
        }
        return "Not found";
    }
}