import { LightningElement, track } from 'lwc';

export default class UdemyCalculator extends LightningElement {
    @track currentResult;
    @track previousResult=[];
    @track showPreviousResult =false;

    firstNumber;
    secondNumber;

    numberChangeHandler(event){
        const inputBox = event.target.name;
        if(inputBox ==='firstnumber'){
            this.firstNumber = event.target.value;
        }
        else if(inputBox ==='secondnumber'){
            this.secondNumber = event.target.value;
        }
    }

    numberAddition(){
        const firstN = parseInt(this.firstNumber);
        const secondN = parseInt(this.secondNumber);
        
        this.currentResult = 'Result of '+firstN+ ' + ' +secondN+ ' is '+(firstN+secondN);
        this.previousResult.push(this.currentResult);
    }

    numberSubtraction(){
        const firstN = parseInt(this.firstNumber);
        const secondN = parseInt(this.secondNumber);
        
        this.currentResult = 'Result of '+firstN+ ' - ' +secondN+ ' is '+(firstN-secondN);
        this.previousResult.push(this.currentResult);
    }

    numberMultiply(){
        const firstN = parseInt(this.firstNumber);
        const secondN = parseInt(this.secondNumber);
        
        this.currentResult = 'Result of '+firstN+ ' x ' +secondN+ ' is '+(firstN*secondN);
        this.previousResult.push(this.currentResult);
    }

    numberDivision(){
        const firstN = parseInt(this.firstNumber);
        const secondN = parseInt(this.secondNumber);
        
        this.currentResult = 'Result of '+firstN+ ' / ' +secondN+ ' is '+(firstN/secondN);
        this.previousResult.push(this.currentResult);
    }
    ShowPreviousResultisToggle(event){
        this.showPreviousResult = event.target.checked;
    }
}