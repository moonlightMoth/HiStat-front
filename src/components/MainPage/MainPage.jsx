import { useState } from "react"
import { DragNDropFiles } from "../DragNDropFiles/DragNDropFiles"
import { MainWindow } from "../MainWindow/MainWindow"

export const MainPage = () => {
    const [needFile, setNeedFile] = useState(false)
    return(
        <>
         {needFile && <DragNDropFiles setFile={setNeedFile}/>}
         {!needFile && <MainWindow/>}
        </>
    )
}