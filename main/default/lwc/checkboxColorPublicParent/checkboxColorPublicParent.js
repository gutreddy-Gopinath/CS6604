import { LightningElement,track } from 'lwc';

export default class CheckboxColorPublicParent extends LightningElement {
    @track inputColor;
    
    onInputColor(event){
        this.inputColor = event.target.value;
    }

    onClickGetColor(){
        const childComp = this.template.querySelector('c-checkbox-color-public');
        const outputMsg = childComp.selectCheckbox(this.inputColor);
        console.log('Output Msg: ',outputMsg);
    }
}