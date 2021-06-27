import { LightningElement, track } from 'lwc';
export default class TrainingMylwcComponent extends LightningElement {
    @track greeting = 'World, gopi';
    changeHandler(event) {
        this.greeting = event.target.value;
    }
}