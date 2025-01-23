import { useState } from "react"
import { DragNDropFiles } from "../DragNDropFiles/DragNDropFiles"
import { MainWindow } from "../MainWindow/MainWindow"

export const MainPage = () => {
    const [needFile, setNeedFile] = useState(true)
    return(
        <>
         {needFile && <DragNDropFiles setFile={setNeedFile}/>}
         {!needFile && <MainWindow/>}
        </>
    )
}