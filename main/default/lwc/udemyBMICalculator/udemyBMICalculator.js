import { LightningElement, track } from 'lwc';

export default class UdemyBMICalculator extends LightningElement {
    @track cardTitle ="BMI Calculator";

    @track bmiData = {
        Weight :0,
        Height :0,
        Result :0
    };
    

    @track bmi;

    WeightHandler(event){
        this.bmiData.Weight = parseFloat(event.target.value);
    }
    HeightHandler(event){
        this.bmiData.Height = parseFloat(event.target.value);
    }

    BMIHandler(event){
        try{
            this.bmiData.Result = this.bmiData.Weight / (this.bmiData.Height*this.bmiData.Height);
        }
        catch(error){
            this.bmiData.Result="undefined";
        }
        

        //console.log("vlaue: ",this.cardTitle);
    }
}