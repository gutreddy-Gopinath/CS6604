import { api, LightningElement,track } from 'lwc';

export default class DemoChildColor extends LightningElement {
    @track value=['red'];

    options=[
        {label:"Red Marker", value:"red"},
        {label:"Blue Marker", value:"blue"},
        {label:"Green Marker", value:"green"},
        {label:"Yellow Marker", value:"yellow"},
    ];

    @api
    selectCheckbox(checkboxvalue){
        const selectedValue = this.options.find(checkbox =>
            {
                return checkboxvalue === checkbox.value;
            })

            if(selectedValue){
                this.value = selectedValue.value;
                return "Successfully found";
            }
            return "Not found";
    }
}