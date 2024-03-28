import styles from "./DropdownRenderer.module.css";
import { useAlerter } from "../../../hooks/useAlerter";
import { useState } from "react";
// import { childrenType } from "../../types/sharedTypes";

export type directionType = {x:-1|0|1, y:-1|0|1}

const directionToClassname = (direction:directionType)=>{
    let res = "";
    if(direction.x === 0 && direction.y === 0)
        return `${styles.middleCenter}`

    if(direction.x === -1)
        res += styles.horizontalLeft;
    else if(direction.x === 0)
        res += styles.horizontalCenter;
    else if(direction.x === 1)
        res += styles.horizontalRight;

    if(res.length > 0)
        res +=  " ";

    if(direction.y === -1)
        res += styles.verticalBottom;
    else if(direction.y === 0)
        res += styles.verticalCenter;
    else if(direction.y === 1)
        res += styles.verticalTop;

    return res;
}

const defaultDirection:directionType = {x:0, y:-1};

export const DropdownRenderer = (
    props:{
        children?: React.ReactNode,
        openningDirection?:directionType,
        includeCloseButton?:boolean,

        buttonRenderer?: (props: {
            onClick:React.MouseEventHandler<HTMLButtonElement>
        })=>JSX.Element,

        dropdownRenderer?: (props: {
            className:string, 
            children?: React.ReactNode
        },
        closeButtonProps?: {
            onClick:React.MouseEventHandler<HTMLButtonElement>, 
            children?: React.ReactNode
        })=>JSX.Element,

        wrapperRenderer?: (props: {
            className:string, 
            children:React.ReactNode, 
            ref: React.MutableRefObject<any>
        })=>JSX.Element
    }) => {

    const ref = useAlerter((e)=>setIsOpen(false))
    const [isOpen, setIsOpen] = useState(false);
    const {
        children = <></>,
        openningDirection = {x:0, y:-1},
        includeCloseButton = false,

        buttonRenderer = (props = {
            onClick: ()=>setIsOpen(prev=>!prev)
        })=><button {...props}>Button Test</button>,

        dropdownRenderer = (props = {
            className: `${styles.dropdown} ${styles.dropdownStyling} ${directionToClassname(openningDirection ?? defaultDirection)}`, 
            children: children
        },
        closeButtonProps = {
            onClick: ()=>setIsOpen(false)
        })=> includeCloseButton ? <span {...props}><button {...closeButtonProps}/>{props.children}</span> : <span {...props}/>,

        wrapperRenderer = (props = {
            className: styles.wrapper, 
            children:<></>, 
            ref:ref
        })=><span {...props}/>
    } = props;


    return <> {wrapperRenderer && wrapperRenderer({
        children: <>
            {buttonRenderer && buttonRenderer({onClick: ()=>setIsOpen(prev=>!prev)})}
            {isOpen === true && dropdownRenderer && dropdownRenderer({className: `${styles.dropdown} ${styles.dropdownStyling} ${directionToClassname(openningDirection ?? defaultDirection)}`, children: children}, includeCloseButton ? {onClick: ()=>setIsOpen(false), children: <>X</>} : {onClick: ()=>{}, children: <></>})}
        </>,
        className: styles.wrapper, 
        ref: ref
    })}</>
}





// export const DropdownRenderer = (
//     props:{
//         children?: childrenType,
//         openningDirection?:directionType,
//         includeCloseButton?:boolean,

//         buttonRenderer?: (props: {
//             onClick:React.MouseEventHandler<HTMLButtonElement>,
//             children?: childrenType,
//             className?:string,
//             ref?:React.MutableRefObject<any>
//         })=>JSX.Element,

//         dropdownRenderer?: (props: {
//             className:string, 
//             children?: childrenType
//         },
//         closeButtonProps?: {
//             onClick:React.MouseEventHandler<HTMLButtonElement>, 
//             children?: childrenType
//         })=>JSX.Element
//     }) => {

//     const ref = useAlerter((e)=>setIsOpen(false))
//     const [isOpen, setIsOpen] = useState(false);
//     const {
//         children = <></>,
//         openningDirection = {x:0, y:-1},
//         includeCloseButton = false,

//         buttonRenderer = (props = {
//             onClick: ()=>setIsOpen(prev=>!prev),
//             children: <></>,
//             className: styles.buttonStyle,
//             ref: ref
//         })=><button {...props}>Button Test</button>,

//         dropdownRenderer = (props = {
//             className: `${styles.dropdown} ${styles.dropdownStyling} ${directionToClassname(openningDirection ?? defaultDirection)}`, 
//             children: children
//         },
//         closeButtonProps = {
//             onClick: ()=>setIsOpen(false),
//             children: <>X</>
//         })=> includeCloseButton ? <span {...props}><button {...closeButtonProps}/>{props.children}</span> : <span {...props}/>,
//     } = props;


//     return <> 
//             {buttonRenderer && buttonRenderer({
//                 onClick: ()=>setIsOpen(prev=>!prev), 
//                 children: <>
//                     {isOpen === true && dropdownRenderer && dropdownRenderer({
//                         className: `${styles.dropdown} ${styles.dropdownStyling} ${directionToClassname(openningDirection ?? defaultDirection)}`, 
//                         children: children
//                     }, 
//                     includeCloseButton ? {
//                         onClick: ()=>setIsOpen(false), 
//                         children: <>X</>
//                     } : {
//                         onClick: ()=>{}, 
//                         children: <></>
//                     })}
//                 </>,
//                 className: styles.buttonStyle,
//                 ref: ref
//             })}
//     </>
// }