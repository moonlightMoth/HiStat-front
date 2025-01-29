import { observer } from "mobx-react";
import "./CustomButton.css";

export const CustomButton = observer(({ checked = false, label, handleClick, value, button = true, style }) => {

    // if (button)
        return (
            <button className={`customButton ${checked ? 'checked' : ''}`} style={style} onClick={() => {if (button) handleClick({target:{value}})}}>
                {label}
            </button>

        )
    // return (
    //     <label className={`customButton ${checked ? 'checked' : ''}`} >
    //         {label}
    //     </label>)

})