import { LightningElement, track } from 'lwc';

export default class BmiCalculator extends LightningElement {

    weight;
    height;

    @track bmi;
    onWeightChange(event){
        this.weight = parseFloat(event.target.value);
    }

    onHeightChange(event){
        this.height = parseFloat(event.target.value);
    }

    /*calculateBMI(){
        try{
        this.bmi = this.weight/(this.height*this.height);
        if(this.bmi === Infinity){
            this.bmi = "Error";
        }
        } catch(error){
            this.bmi = undefined;
        }
    }*/
    calculateBMI(){
        this.bmi = this.weight/(this.height*this.height);
    }

    get getBMIValue(){
        return `your BMI Value is: ${this.bmi}`;
    }
}