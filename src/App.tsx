import React, { ReactElement, useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
// import { signal } from '@preact/signals-react';
import { signal } from '@preact/signals-react';
import { Json } from './utils/sharedComponents/Json/Json';
import { createPortal } from 'react-dom';
// import { If } from './utils/If';
// import { Board, BoardItem } from './utils/Game/Board/Board';

import { DropdownRenderer } from './utils/sharedComponents/renderers/DropdownRenderer/DropdownRenderer';
import {PopupRenderer} from "./utils/sharedComponents/renderers/PopupRenderer/PopupRenderer";
const createSignal:(initValue:any)=>[(getJSX?:boolean)=>any,(v:any)=>void] = (initValue:any) => {
  const sig = signal(initValue);
  const getter = (getJSX=true) => {
    if(getJSX)
      return sig;
    else return sig.value;
  }
  const setter = (v:any) => {
    sig.value = typeof(v) === "function" ? v(sig.value) : v;
  }
  return [getter, setter];
}

const useIdPortal = (id:string) => {
  
  const ref = useRef<any|null>(null);
  useEffect(()=>{
      ref.current = document.getElementById(id);
  },[]);
  return {
    Initiator: (props:any) => {
      //
      return <>{ref.current && createPortal(props.children || "", ref.current)}</>
    },
  }
}
const useRefPortal = () => {
  const ref = useRef<any[]>([]);
  const elm = useRef<any|null>(null);
  useEffect(()=>{
    elm.current = (props:any) => <>{ref.current.map(elem => elem && createPortal(props.children || "", elem))}</>
  },[])
  return {
    Initiator: (props:any) => {
      //
      return <>{elm.current && elm.current(props)}</>
      // return <>{ref.current[index.current] && createPortal(props.children || "", ref.current[index.current])}</>
    },
    ref: (element:any) => {!ref.current.includes(element) && ref.current.push(element);console.log(ref)}
  }
}

const [sig, setSig] = createSignal(20)
function App() {
  const {Initiator: IdInitiator} = useIdPortal("0101")
  const {Initiator: RefInitiator, ref} = useRefPortal()
  console.log("!!!")
  const [s, setS] = useState(false)
  const [arr, setArr] = useState<any[]>([{
    id: "1233",
    name: "maor",
    arr: [
        "Hello",
        "Goodbye"
    ],
    obj: {
        arr: [1,2,3,1],
        la: true,
        li: 22,
        lo: {
          ["@metaverse"]: "Hello from the other side"
        }
    }},
    {
      id: "1233",
      name: "maor",
      arr: [
          "Hello",
          "Goodbye"
      ],
      obj: {
          arr: [1,2,3,1],
          la: true,
          li: 22,
          lo: {
            ["@metaverse"]: "Hello from the other side"
          }
      }}])
  return (
    <>
    {/* <Board width={200} height={200}>
      <BoardItem width={10} height={10} xPosition={10} yPosition={10}/>
    </Board> */}
      {/* <If condition={false}>
        <>
          Hello!
        </>
      </If>


      <IdInitiator><p>Hello from ID!!</p></IdInitiator>
      <RefInitiator><p>Hello from ref!!</p></RefInitiator>
      <button onClick={()=>setSig((prev:any)=>prev + 1)}>{sig()}</button>
      <button onClick={()=>setS(prev=>!prev)}>RERENDER</button>
      <div id="0101">1</div>
      <div ref={ref}>2</div>
      <div ref={ref}>3</div>
      <div ref={ref}>4</div>
        <Json value={arr} keyName='JSON' setValue={setArr} options={{}}/> */}
        <div className='sss'>
          <PopupRenderer 
          buttonRenderer={props => <button {...props}>pop</button>} 
          // popupRenderer={(props, closeButtonProps) => <span className={`${props.className} testPopupClass`}><button {...closeButtonProps}/>{props.children}<div>lksjdlkjads</div></span>}
          // wrapperRenderer={props => <span {...props}/>}
          // includeCloseButton={true}
          >
            <div className='testPopupClass'>saddas</div>
          </PopupRenderer>
          <DropdownRenderer 
          buttonRenderer={props => <button {...props}>Hello</button>} 
          // dropdownRenderer={(props, closeButtonProps) => <span className={`${props.className} testDropdownClass`}><button {...closeButtonProps}/>{props.children}</span>}
          // wrapperRenderer={props => <span {...props}/>}
          openningDirection={{x:0, y:-1}}
          includeCloseButton={false}
          >
            <div className='testDropdownClass'>saddas</div>
          </DropdownRenderer>

        </div>
    </>
  );
}

export default App;
