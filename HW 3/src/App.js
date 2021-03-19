import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import Select from './select'; 
/*import Tree from 'react-d3-tree';*/

function App() {

  const [enteredValue, setEnteredValue] = useState({ label: "", value: "" })
  const [requiredValue, setRequiredValue] = useState({ label: "", value: "" })

  let i = [
    { label:'a1',start:0, end:26, data:[
      {
        label:'b1',start:0, end:8, data:[
          {
            label:'c1',start:0, end:2, data:[
              0,1,2
            ]
          },
          {
            label:'c2',start:3, end:5, data:[
              3,4,5
            ]
          },
          {
            label:'c3',start:6, end:8, data:[
              6,7,8
            ]
          }
        ]
      },
      {
        label:'b2',start:9, end:17, data:[
          {
            label:'c4',start:9, end:11, data:[
              9,10,11
            ]
          },
          {
            label:'c5',start:12, end:14, data:[
              12,13,14
            ]
          },
          {
            label:'c6',start:15, end:17, data:[
              15,16,17
            ]
          }
        ]
      },
      {
        label:'b3',start:18, end:26, data:[
          {
            label:'c7',start:18, end:20, data:[
              18,19,20
            ]
          },
          {
            label:'c8',start:21, end:23, data:[
              3,4,5
            ]
          },
          {
            label:'c9',start:24, end:26, data:[
              6,7,8
            ]
          }
        ]
      },
  
    ] 
    },


]

let search = requiredValue.value;
let path = ['i'];
for (let j = 0; j <i.length; j++) {
    let row = i[j];
    // which a - 1, 2, 3
    if (row.start <= search && row.end >= search) {
        path.push(row.label);

        for (let k =0; k<row.data.length; k++) {
            let row2 = row.data[k];
            if (row2.start <= search && row2.end >= search) {
                path.push(row2.label);

                for (let l =0; l<row.data.length; l++) {
                    let row3 = row2.data[l];
                    if (row3.start <= search && row3.end >= search) {
                        path.push(row3.label);
                        break;
                    }
                }

                break;
            }
        }

        break;
    }
}

console.log(path);

  /* It should contain all the data of tree, so i m taking data upto 80*/
  const getBroadCastOptions = () => {
    const options = [];
    for (let i = 0; i <= 80; i += 1) {
      options.push({
        label: `${i}`,
        value: `${i}`,
      })
    }
    return options
  }
  
  return (
    <div className="App">
      Entered Value:
      <Select onChange={setEnteredValue} options={getBroadCastOptions()} />
      <br/>
      Required Value:
      <Select onChange={setRequiredValue} options={getBroadCastOptions()} />
      <br/>
      In Entire Path Replication: {path.join(' -> ')}
    </div>
  );
}

export default App;