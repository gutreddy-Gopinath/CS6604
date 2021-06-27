import { LightningElement, track } from 'lwc';

export default class DemoParentColor extends LightningElement {
    @track value;

    onInputChange(event){
        this.value = event.target.value;
    }

    handleClick(){
        const childComp = this.template.querySelector('c-demo-child-color');
        const returnedMsg = childComp.selectCheckbox(this.value);
        console.log("Value:",returnedMsg);
    }
}