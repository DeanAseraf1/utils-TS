import styles from "./PopupRenderer.module.css";
import { useAlerter } from "../../../hooks/useAlerter";
import { useState } from "react";
// import { childrenType } from "../../types/sharedTypes";

export const PopupRenderer = (
    props:{
        children?: React.ReactNode,
        includeCloseButton?:boolean,

        buttonRenderer?: (props: {
            onClick:React.MouseEventHandler<HTMLButtonElement>
        }) => JSX.Element,

        popupRenderer?: (props: {
            className:string,
            children?: React.ReactNode
        },
        closeButtonProps?: {
            onClick:React.MouseEventHandler<HTMLButtonElement>, 
            children?: React.ReactNode
        }) => JSX.Element,

        wrapperRenderer?: (props: {
            children:React.ReactNode, 
            ref: React.MutableRefObject<any>
        }) => JSX.Element
    }) => {

    const ref = useAlerter((e)=>setIsOpen(false))
    const [isOpen, setIsOpen] = useState(false);

    const {
        children = <></>,
        includeCloseButton = true,

        buttonRenderer = (props = {
            onClick: ()=>setIsOpen(prev=>!prev)
        })=><button {...props}>Button Test</button>,

        popupRenderer = (props = {
            className: `${styles.popup} ${styles.popupStyling}`, 
            children: children}, 
        closeButtonProps = {
            onClick: ()=>setIsOpen(false)
        })=>includeCloseButton === true ? <span {...props}><button {...closeButtonProps}/>{props.children}</span> : <span {...props}/>,

        wrapperRenderer = (props = {
            children:<></>, 
            ref:ref
        })=><span {...props}/>
    } = props;

    return <> {wrapperRenderer && wrapperRenderer({
        children: <>
            {buttonRenderer && buttonRenderer({onClick: ()=>setIsOpen(prev=>!prev)})}
            {isOpen === true && popupRenderer && popupRenderer({className: `${styles.popup} ${styles.popupStyling}`, children: children}, includeCloseButton === true ? {onClick: ()=>setIsOpen(false), children: <>X</>} : {onClick: ()=>{}, children: <></>})}
        </>,
        ref: ref
    })}</>
}