import { LightningElement,track } from 'lwc';

export default class Calculator extends LightningElement {
    @track valueA;
    @track valueB;
    result;

    onClickAdd(){
        //this.result = (this.numbera) + (this.numberb);
        console.log("A",this.valueA);
        this.result = parseInt(this.valueA) + parseInt(this.valueB);
        //this.result = parseInt(this.numbera)+ parseInt(this.numberb);
        console.log("Result:",this.result);
    }

    onClickSub(){
        this.result = parseInt(this.valueA) + parseInt(this.valueB);
    }

    onClickMul(){
        this.result = parseInt(this.valueA) * parseInt(this.valueB);
    }

    
    onClickDiv(){
        this.result = parseInt(this.valueA) / parseInt(this.valueB);
    }
    handleNumberOneChange(event){
        this.valueA = (event.target.value);
        console.log("A",this.valueA);
    }
    handleNumberTwoChange(event){
        this.valueB = (event.target.value);
        console.log("B",this.valueB);
    }


    /*handleChanges(event){


        if(event.target.name==='fnumber'){


            this.firstNumber= event.target.value;


        }


        if(event.target.name==='snumber'){


            this.secondNumber= event.target.value;


        }


        this.result = parseInt(this.firstNumber)+ parseInt(this.secondNumber);


    }*/


}


