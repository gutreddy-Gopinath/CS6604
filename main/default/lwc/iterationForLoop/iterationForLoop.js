import { LightningElement, track } from 'lwc';

export default class IterationForLoop extends LightningElement {
    @track displayCities = false;
    //@track listCities = ['NY','LA','CHI','DAL','STL'];
    @track listCities = [
        {
            Id:1,
            Name:'NY',
        },
        {
            Id:2,
            Name:'LA',
        },
        {
            Id:3,
            Name:'CHI',
        },
        {
            Id:4,
            Name:'DAL',
        },
    ];

    showCities(event){
        this.displayCities = event.target.checked;
    } 
}