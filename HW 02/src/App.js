import React, { useState } from 'react';
import Select from './Select'
import { filter, findIndex, cloneDeep } from 'lodash'
import './styles.scss'

const TIMER = 3000;

const mhMSSParents = {
  "MH1": "MSS1",
  "MH2": "MSS1",
  "MH3": "MSS1",
  "MH4": "MSS2",
  "MH5": "MSS2",
  "MH6": "MSS2",
  "MH7": "MSS3",
  "MH8": "MSS3",
  "MH9": "MSS3",
  "MH10": "MSS4",
  "MH11": "MSS4",
  "MH12": "MSS4",
}

const mhProxyParents = {
  "MH1": "Proxy 1",
  "MH2": "Proxy 1",
  "MH3": "Proxy 1",
  "MH4": "Proxy 1",
  "MH5": "Proxy 1",
  "MH6": "Proxy 1",
  "MH7": "Proxy 2",
  "MH8": "Proxy 2",
  "MH9": "Proxy 2",
  "MH10": "Proxy 2",
  "MH11": "Proxy 2",
  "MH12": "Proxy 2",
}

const proxiesByMSS = {
  "MSS1": "Proxy 1",
  "MSS2": "Proxy 1",
  "MSS3": "Proxy 2",
  "MSS4": "Proxy 2"
}

const initialMHCounters = {
  "MH1": 0,
  "MH2": 0,
  "MH3": 0,
  "MH4": 0,
  "MH5": 0,
  "MH6": 0,
  "MH7": 0,
  "MH8": 0,
  "MH9": 0,
  "MH10": 0,
  "MH11": 0,
  "MH12": 0,
}

const initialMSSQueues = {
  "MSS1": [],
  "MSS2": [],
  "MSS3": [],
  "MSS4": []
}

function App() {
  const [mode, setMode] = useState({ label: "", value: "" })
  const [tokenRequestSource, setTokenRequestSource] = useState({ label: "", value: "" })
  const [mhCounters, setMHCounter] = useState(initialMHCounters)
  const [localQueues, updateLocalQueues] = useState(initialMSSQueues)
  const [tokenPosition, setTokenPosition] = useState({ label: "", value: "" })
  const [requestQueue, updateRequestQueue] = useState([])
  const [proxyGrantQueue, updateProxyGrantQueue] = useState([])
  const [mhProxyMovementsDict, updateMHProxyMovement] = useState(mhProxyParents)
  const [mhMSSMovementsDict, updateMHMSSMovement] = useState(mhMSSParents)
  const [mhToMove, setMHToMove] = useState({ label: "", value: "" })
  const [mssToMoveTo, setMssToMoveTo] = useState({ label: "", value: "" })
  
  const getModeOptions = () => {
    return [{
      label: "Proxy",
      value: "PROXY"
    },{
      label: "Replication",
      value: "REPLICATION"
    },
    ]
  }

  const getAllMHs = () => {
    const allMHs = []
    for (let i = 1; i <= 12; i += 1) {
      allMHs.push({
        label: `MH${i}`,
        value: `MH${i}`
      })
    }
    return allMHs
  }

  const getAllMSS = () => Object.keys(initialMSSQueues).map(mss => ({ label: mss, value: mss }))

  const getMSSToMoveTo = () => {
    return [{ label: 'MSS1', value: 'MSS1' },
    { label: 'MSS2', value: 'MSS2' },
    { label: 'MSS3', value: 'MSS3' },
    { label: 'MSS4', value: 'MSS4' },].filter(mss => mss.value !== mhMSSMovementsDict[mhToMove.value])
  }

  const submitRequestToMSS = () => {
    const mss = mhMSSParents[tokenRequestSource.value]
    const mhCountersClone = {...mhCounters}
    const h_count = mhCounters[tokenRequestSource.value] + 1;
    const h = tokenRequestSource.value;
    const queue = cloneDeep(localQueues)
    const request = { h, h_count, id: Date.now(), isDeliverable: null, mss, priority: null }
    queue[mss].push(request)
    mhCountersClone[h] = h_count
    setMHCounter(mhCountersClone)
    updateLocalQueues(queue)
    // console.log("After submitting request: ", {mhCounters: mhCountersClone, localQueues: queue})
    console.log("-----------------------------------")
    console.log(`Request submitted to ${mss}`)
    Object.keys(queue).map(req => {
      queue[req].length && console.log(`${req} local queue:`)
      queue[req].length && console.log(`h         h_count         deliverable         local_priority`)
      queue[req].length && queue[req].map(item => {
        // h: item.h, h_count: item.h_count, Deliverable: item.isDeliverable, global_priority: item.priority
        console.log(`${item.h}         ${item.h_count}                   ${item.isDeliverable}                   ${item.priority}`)
      })
    })
    setTokenRequestSource({ label: "", value: "" })
    setTimeout(() => {
      gatherReqPriorityFromAllMSS(request, queue)
    }, TIMER);
  }

  const gatherReqPriorityFromAllMSS = (request, q) => {
    const queue = cloneDeep(q)
    // console.log({ localQueues })
    const allMSSExceptSource = Object.keys(initialMSSQueues).filter(mss => mss !== request.mss)
    const highestHCounts = []
    for (let i = 0; i < allMSSExceptSource.length; i += 1) {
      const currentMss = allMSSExceptSource[i]
      let maxPriority = Math.max(...queue[currentMss].map(req => req.priority || 0))
      // console.log({ maxPriority })
      maxPriority = maxPriority > 0 ? maxPriority : 0 
      queue[currentMss].push({ ...request, priority: maxPriority + 1, isDeliverable: false })
      highestHCounts.push(maxPriority + 1)
      updateLocalQueues(queue)
    }
    console.log("-----------------------------------")
    console.log(`Gathering priority from all the other MSSs`)
    Object.keys(queue).map(req => {
      queue[req].length && console.log(`${req} local queue:`)
      queue[req].length && console.log(`h         h_count         deliverable         local_priority`)
      queue[req].length && queue[req].map(item => {
        // h: item.h, h_count: item.h_count, Deliverable: item.isDeliverable, global_priority: item.priority
        console.log(`${item.h}         ${item.h_count}                   ${item.isDeliverable}                   ${item.priority}`)
      })
    })
    setTimeout(() => {
      assignGlobalPriorityToReq(request, highestHCounts, queue)
    }, TIMER);
  }

  const assignGlobalPriorityToReq = (request, hCounts, q) => {
    const queue = cloneDeep(q)
    const maxHCount = Math.max(...hCounts)
    const index = findIndex(queue[request.mss], { id: request.id })
    queue[request.mss][index].priority = maxHCount
    queue[request.mss][index].isDeliverable = true
    updateLocalQueues(queue)
    console.log("-----------------------------------")
    console.log(`Assigning final priority at local MSS`)
    Object.keys(queue).map(req => {
      queue[req].length && console.log(`${req} local queue:`)
      queue[req].length && console.log(`h         h_count         deliverable         global_priority`)
      queue[req].length && queue[req].map(item => {
        // h: item.h, h_count: item.h_count, Deliverable: item.isDeliverable, global_priority: item.priority
        console.log(`${item.h}         ${item.h_count}                   ${item.isDeliverable}                   ${item.priority}`)
      })
    })
    setTimeout(() => {
      broadcastPriorityToAllMSS(request, maxHCount, queue)
    }, TIMER);
  } 

  const broadcastPriorityToAllMSS = (request, maxHCount, q) => {
    const queue = cloneDeep(q)
    const allMSSExceptSource = Object.keys(initialMSSQueues).filter(mss => mss !== request.mss)
    for (let i = 0; i < allMSSExceptSource.length; i += 1) {
      const currentMss = allMSSExceptSource[i]
      const index = findIndex(queue[currentMss], { id: request.id })
      queue[currentMss][index].priority = maxHCount
      queue[currentMss][index].isDeliverable = true
      // console.log("test", { currentMss, value: queue[currentMss][index] })
    }
    console.log("-----------------------------------")
    console.log(`Assigning final priority at all MSSs`)
    Object.keys(queue).map(req => {
      queue[req].length && console.log(`${req} local queue:`)
      queue[req].length && console.log(`h         h_count         deliverable         global_priority`)
      queue[req].length && queue[req].map(item => {
        // h: item.h, h_count: item.h_count, Deliverable: item.isDeliverable, global_priority: item.priority
        console.log(`${item.h}         ${item.h_count}                   ${item.isDeliverable}                   ${item.priority}`)
      })
    })
    updateLocalQueues(queue)
  }

  const giveTokenToSelectedMSS = () => {
    const currentMss = tokenPosition.value
    const allRequests = filter(localQueues[currentMss], { mss: currentMss })
    allRequests.map(releaseRequestAtLocalMSS)
  }

  const releaseRequestAtLocalMSS = (request) => {
    const queue = cloneDeep(localQueues)
    if (request.h_count === mhCounters[request.h]) {
      queue[request.mss] = queue[request.mss].filter(req => req.id !== request.id)
      console.log("-----------------------------------")
      console.log(`Releasing request`)
      Object.keys(queue).map(req => {
        queue[req].length && console.log(`${req} queue:`)
        queue[req].length && console.log(`h         h_count         deliverable         global_priority`)
        queue[req].length && queue[req].map(item => {
          // h: item.h, h_count: item.h_count, Deliverable: item.isDeliverable, global_priority: item.priority
          console.log(`${item.h}         ${item.h_count}                   ${item.isDeliverable}                   ${item.priority}`)
        })
      })
      updateLocalQueues(queue)
      setTimeout(() => {
        releaseRequestAtAllMSS(request, queue)
      }, TIMER);
      setTokenPosition({ label: "", value: "" })
    }
  }

  const releaseRequestAtAllMSS = (request, q) => {
    const queue = cloneDeep(q)
    const allMSSExceptSource = Object.keys(initialMSSQueues).filter(mss => mss !== request.mss)
    for (let i = 0; i < allMSSExceptSource.length; i += 1) {
      const currentMss = allMSSExceptSource[i]
      queue[currentMss] = queue[currentMss].filter(req => req.id !== request.id)
    }
    console.log('Releasing request from other MSSs')
    Object.keys(queue).map(req => {
      queue[req].length && console.log(`${req} queue:`)
      queue[req].length && console.log(`h         h_count         deliverable         global_priority`)
      queue[req].length && queue[req].map(item => {
        // h: item.h, h_count: item.h_count, Deliverable: item.isDeliverable, global_priority: item.priority
        console.log(`${item.h}         ${item.h_count}                   ${item.isDeliverable}                   ${item.priority}`)
      })
    })
    updateLocalQueues(queue)
  }
  
  const submitRequestToProxy = () => {
    // const mss = mhMSSMovementsDict[tokenRequestSource.value]
    const proxy = mhProxyMovementsDict[tokenRequestSource.value]
    const queue = cloneDeep(requestQueue)
    const request = { h: tokenRequestSource.value, proxy, id: Date.now() }
    queue.push(request)
    updateRequestQueue(queue)
    console.log(`Request Queue: [${queue.map(item => (`< ${item.h}, ${item.proxy} >`)).join(", ")}]`)
  }

  const getMHsByProxy = () => {
    const mhsByProxy = {
      "Proxy 1": [],
      "Proxy 2": []
    }
    Object.entries(mhProxyMovementsDict).map(([key, value] )=> {
      mhsByProxy[value].push(key)
    })
    return mhsByProxy
  }

  const getNewRequestQueue = () => {
    const newQueue = requestQueue.map(req => ({ ...req, proxy: mhProxyMovementsDict[req.h] }))
    return newQueue
  }

  const giveTokenToProxy = () => {
    // const mhsByProxy = getMHsByProxy()
    const updatedRequestQueue = getNewRequestQueue()
    const allRequestsInProxy = updatedRequestQueue.filter(req => req.proxy === tokenPosition.value)
    const newRequestQueue = updatedRequestQueue.filter(req => req.proxy !== tokenPosition.value)
    // console.log({ newRequestQueue, allRequestsInProxy })
    console.log(`Updated Request Queue: [${newRequestQueue.map(item => (`< ${item.h}, ${item.proxy} >`)).join(", ")}]`)
    console.log(`Grant Queue: [${allRequestsInProxy.map(item => (`< ${item.h}, ${item.proxy} >`)).join(", ")}]`)
    updateRequestQueue(newRequestQueue)
    updateProxyGrantQueue(allRequestsInProxy)
    setTimeout(() => {
      serveRequestsInGrantQueue(allRequestsInProxy)
    }, TIMER);
  }

  const serveRequestsInGrantQueue = requests => {
    if (requests.length === 0) return;
    const reqClone = cloneDeep(requests)
    const temp = reqClone.shift()
    console.log(`Served request from Grant Queue: ${`< ${temp.h}, ${temp.proxy} >`}`)
    console.log(`Updated Grant Queue: [${reqClone.map(item => (`< ${item.h}, ${item.proxy} >`)).join(", ")}]`)
    updateProxyGrantQueue(reqClone)
    setTimeout(() => {
      serveRequestsInGrantQueue(reqClone)
    }, TIMER);
  }

  const moveMHToMSS = () => {
    const mh = mhToMove.value
    const mss = mssToMoveTo.value
    const proxy = proxiesByMSS[mssToMoveTo.value];
    const mssMovement = cloneDeep(mhMSSMovementsDict)
    const proxyMovement = cloneDeep(mhProxyMovementsDict)
    mssMovement[mh] = mss
    proxyMovement[mh] = proxy
    updateMHProxyMovement(proxyMovement)
    updateMHMSSMovement(mssMovement)
    console.log(`${mh} moved to ${mss}, new proxy: ${proxy}`)
  }

  const getMHsByMSS = (mssID) => {
    const mhs = []
    Object.entries(mhMSSMovementsDict).map(([mh, mss]) => {
      if (mss === mssID) mhs.push(mh)
    })
    return mhs
  }

  return (
    <div className="App">
      <div className="App-div" style={{ margin: '15px', padding: '15px', display: 'flex' }}>
        <div style={{ width: "35%", height: '100vh' }}>
          <h3 as="h3">Token Ring Strategies</h3>
          <div className="select-cache">
            <label>Option: </label>
            <Select value={mode} onChange={setMode} options={getModeOptions()} />
          </div>
          {mode.value === "REPLICATION" && <>
            <div>
              <div className="select-cache">
                <label>Request From: </label>
                <Select value={tokenRequestSource} onChange={setTokenRequestSource} options={getAllMHs()} />
              </div>
              <div className="select-cache cache-buttons">
                <button primary onClick={submitRequestToMSS}>Request</button>
              </div>
            </div>
            <div>
              <div className="select-cache">
                <label>Token Location At: </label>
                <Select value={tokenPosition} onChange={setTokenPosition} options={getAllMSS()} />
              </div>
              <div className="select-cache cache-buttons">
                {tokenPosition.value && <button secondary onClick={giveTokenToSelectedMSS}>Submit</button>}
              </div>
            </div>
          </>}
          {mode.value === "PROXY" && <>
            <div>
              <div className="select-cache">
                <label>Request From: </label>
                <Select value={tokenRequestSource} onChange={setTokenRequestSource} options={getAllMHs()} />
              </div>
              <div className="select-cache cache-buttons">
                <button primary onClick={submitRequestToProxy}>Request</button>
              </div>
            </div>
            <div>
              <h4 as="h3">Move MH</h4>
              <div className="select-cache">
                <label>Select MH: </label>
                <Select value={mhToMove} onChange={setMHToMove} options={getAllMHs()} />
              </div>
              <div className="select-cache">
                <label>Select MSS: </label>
                <Select value={mssToMoveTo} onChange={setMssToMoveTo} options={getMSSToMoveTo()} />
              </div>
              <div className="select-cache cache-buttons">
                <button primary onClick={moveMHToMSS}>Move</button>
              </div>
            </div>
            <div>
              <div className="select-cache">
                <label>Token Location At: </label>
                <Select value={tokenPosition} onChange={setTokenPosition} options={[{label: "Proxy 1", value: "Proxy 1"},{label: "Proxy 2", value: "Proxy 2"}]} />
              </div>
              <div className="select-cache cache-buttons">
                {tokenPosition.value && <button secondary onClick={giveTokenToProxy}>Submit</button>}
              </div>
            </div>
          </>}
        </div>
        {mode.value === "REPLICATION" && <div style={{display: "flex", flexDirection: "column" }}>
          <div id="treeWrapper" style={{ width: '70%', marginLeft: "15px"}}>
            <div className="ring">
              <div className="replication-containers">
              <div className="mss-1-container">
                <div className="nodes">
                  <div className="mss"><label>MSS1</label></div>
                  <div className="mhs-container">
                    <div className="mhs"><label>MH1</label></div>
                    <div className="mhs"><label>MH2</label></div>
                    <div className="mhs"><label>MH3</label></div>
                  </div>
                </div>
              </div>
              <div className="mss-2-container">
                <div className="nodes">
                  <div className="mss"><label>MSS2</label></div>
                  <div className="mhs-container">
                    <div className="mhs"><label>MH4</label></div>
                    <div className="mhs"><label>MH5</label></div>
                    <div className="mhs"><label>MH6</label></div>
                  </div>
                </div>
              </div>
              </div>
              <div className="replication-containers">
              <div className="mss-3-container">
                <div className="nodes">
                  <div className="mss"><label>MSS3</label></div>
                  <div className="mhs-container">
                    <div className="mhs"><label>MH7</label></div>
                    <div className="mhs"><label>MH8</label></div>
                    <div className="mhs"><label>MH9</label></div>
                  </div>
                </div>
              </div>
              <div className="mss-4-container">
                <div className="nodes">
                  <div className="mss"><label>MSS4</label></div>
                  <div className="mhs-container">
                    <div className="mhs"><label>MH10</label></div>
                    <div className="mhs"><label>MH11</label></div>
                    <div className="mhs"><label>MH12</label></div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
          {/* <div className="local-queues" style={{ width: '30%'}}>
            {Object.keys(localQueues).map(queue => (
              <div key={queue} style={{ margin: "20px" }}>
                <h3 as='h3'>
                  {queue}
                </h3>
                <table celled padded >
                  <thead>
                    <tr>
                      <th singleLine>MH</th>
                      <th>H_Count</th>
                      <th>Deliverable</th>
                      <th>Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {localQueues[queue].map(req => (
                      <tr key={req.id}>
                        <td>
                            {req.h}
                        </td>
                        <td singleLine>{req.h_count}</td>
                        <td singleLine>{req.isDeliverable === null ? "N/A" : req.isDeliverable === true ? "Yes" : "No"}</td>
                        <td singleLine>{req.priority === null ? "N/A" : req.priority}</td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div> */}
        </div>}
        {mode.value === "PROXY" && <div>
        <div style={{display: "flex", flexDirection: "column" }}>
          <div id="treeWrapper" style={{ marginLeft: "15px"}}>
            <div className="ring">
              <div className="proxy-1">
                <h3 as="h3" textAlign="center" style={{ marginTop: 15 }}>Proxy 1</h3>
                <div className="container">
                <div className="mss-1-container">
                  <div className="nodes">
                    <div className="mss"><label>MSS1</label></div>
                    <div className="mhs-container">
                      {getMHsByMSS("MSS1").map(mh => <div key={mh} className="mhs"><label>{mh}</label></div>)}
                    </div>
                  </div>
                </div>
                <div className="mss-2-container">
                  <div className="nodes">
                    <div className="mss"><label>MSS2</label></div>
                    <div className="mhs-container">
                      {getMHsByMSS("MSS2").map(mh => <div key={mh} className="mhs"><label>{mh}</label></div>)}
                    </div>
                  </div>
                </div>
                </div>
              </div>
              <div className="proxy-2">
              <h3 as="h3"  textAlign="center" style={{ marginTop: 15 }}>Proxy 2</h3>
              <div className="container">
              <div className="mss-3-container">
                <div className="nodes">
                  <div className="mss"><label>MSS3</label></div>
                  <div className="mhs-container">
                    {getMHsByMSS("MSS3").map(mh => <div key={mh} className="mhs"><label>{mh}</label></div>)}
                  </div>
                </div>
              </div>
              <div className="mss-4-container">
                <div className="nodes">
                  <div className="mss"><label>MSS4</label></div>
                  <div className="mhs-container">
                    {getMHsByMSS("MSS4").map(mh => <div key={mh} className="mhs"><label>{mh}</label></div>)}
                  </div>
                </div>
              </div>
              </div>
              </div>
            </div>
          </div>
          {/* <div className="local-queues">
            <div className="queue">
              <h3 as='h3'>
                Request Queue
              </h3>
                <div style={{ margin: "20px" }}>
                  <table celled padded>
                    <thead>
                      <tr>
                        <th singleLine>MH</th>
                        <th>Proxy</th>
                      </tr>
                    </thead>
                    <tbody>
                    {requestQueue.map(req => (
                        <tr key={req.id}>
                          <td>
                            {req.h}
                          </td>
                          <td singleLine>{req.proxy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            </div>
            <div className="queue">
              <h3 as='h3'>
                Grant Queue
              </h3>
                <div style={{ margin: "20px" }}>
                  <table celled padded>
                    <thead>
                      <tr>
                        <th singleLine>MH</th>
                        <th>Proxy</th>
                      </tr>
                    </thead>
                    <tbody>
                    {proxyGrantQueue.map(req => (
                        <tr key={req.id}>
                          <td>
                            {req.h}
                          </td>
                          <td singleLine>{req.proxy}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            </div>
          </div> */}
        </div>
          </div>}
      </div>
    </div>
  );
}

export default App;
