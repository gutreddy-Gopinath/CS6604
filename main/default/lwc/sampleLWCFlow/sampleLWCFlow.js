import { LightningElement , api} from 'lwc';

export default class SampleLWCFlow extends LightningElement {

@api records=[];
@api fieldColumns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Title', fieldName: 'Title' },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' }
];
}