import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import Select from './select'; 
import Tree from 'react-d3-tree';
import { Header, Button, Input } from 'semantic-ui-react'


function App() {

  const [enteredValue, setEnteredValue] = useState({ label: "", value: "" })
  const [requiredValue, setRequiredValue] = useState({ label: "", value: "" })
  const [mode, setMode] = useState({ label: "", value: "" })
  const [pa,setPath] = useState()

  const straightPathFunc = (linkDatum, orientation) => {
    const { source, target } = linkDatum;
    return orientation === 'horizontal'
      ? `M${source.y},${source.x}L${target.y},${target.x}`
      : `M${source.x},${source.y}L${target.x},${target.y}`;
  };

  const handleNodeClick = (param) => {
    console.log(param)
  }
  const showPointer = () => {
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
      //setPath(path.join(' -> '))
      //In Entire Path Replication: {requiredValue.value ? path.join(' -> '):'' }

    
  }
  const getModeOptions = () => {
    return [{
      label: "Entire Path Replication",
      value: "ENTIRE_PATH"
    },{
      label: "Partila Path Replication",
      value: "PARTIAL_PATH"
    },
    ]
  }
  const dataIndex = {
    "name": "I",
    "children": [{
      "name": "a1",
      "children": [{
        "name": "b1",
        "children": [{
          "name": "c1",
          "children":[{
            "name": "0",
          },{
            "name": "1",
          },{
            "name": "2",
          }]
        },{
          "name": "c2",
          "children":[{
            "name": "3",
          },{
            "name": "4",
          },{
            "name": "5",
          }]
        },{
          "name": "c3",
          "children":[{
            "name": "6",
          },{
            "name": "7",
          },{
            "name": "8",
          }]
        }]
    }, 
    {
      "name": "b2",
      "children": [{
        "name": "c4",
        "children":[{
          "name": "9",
        },{
          "name": "10",
        },{
          "name": "11",
        }]
      },{
        "name": "c5",
        "children":[{
          "name": "12",
        },{
          "name": "13",
        },{
          "name": "14",
        }]
      },{
        "name": "c6",
        "children":[{
          "name": "15",
        },{
          "name": "16",
        },{
          "name": "17",
        }]
      }]
    },
    {
      "name": "b3",
      "children": [{
        "name": "c7",
        "children":[{
          "name": "18",
        },{
          "name": "19",
        },{
          "name": "20",
        }]
      },{
        "name": "c8",
        "children":[{
          "name": "21",
        },{
          "name": "22",
        },{
          "name": "23",
        }]
      },{
        "name": "c9 test",
        "children":[{
          "name": "24",
        },{
          "name": "25",
        },{
          "name": "26",
        }]
      }]
    },
  ]
  },{
    "name": "a2",
    "children": [{
      "name": "b4",
      "children": [{
        "name": "c10"
      },{
        "name": "c11"
      },{
        "name": "c12"
      }]
  },{
    "name": "b5",
    "children": [{
      "name": "c13"
    },{
      "name": "c14"
    },{
      "name": "c15"
    }]
  }]
  }]
  }
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
      <div className="App-div" style={{ margin: '15px', padding: '15px', display: 'flex' }}>
        <div style={{ width: "30%", height: '100vh', borderRight: '1px solid silver' }}>
        <div className="select-cache">
            <label>Select Mode</label>
            <Select value={mode} onChange={setMode} options={getModeOptions()} />
        </div>
        Entered Value:
        <Select onChange={setEnteredValue} options={getBroadCastOptions()} />
        <br/>
        Required Value:
        <Select onChange={setRequiredValue} options={getBroadCastOptions()} />
        <br/>
        
        {mode.value === "ENTIRE_PATH" && <div>
            <div className="select-cache cache-buttons">
              <Button primary onClick={showPointer}>Show Direction</Button>
            </div>
          </div>}
        {mode.value === "PARTIAL_PATH" && <div>
            <div className="select-cache cache-buttons">
              <Button primary onClick={showPointer}>Show Direction</Button>
            </div>
          </div>}
          In Entire Path Replication: {requiredValue.value ? path.join(' -> '):'' }
        </div>
        
        <div style={{ width: '70%', height: '100em' }}>
        <Tree
              data={dataIndex}
              orientation="vertical"
              pathFunc={straightPathFunc}
              onNodeClick={handleNodeClick}
            />
        </div>
      
    </div>
     
    </div>
  );
}

export default App;