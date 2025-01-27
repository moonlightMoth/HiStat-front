import { useEffect, useState } from "react"
import { DragNDropFiles } from "../DragNDropFiles/DragNDropFiles"
import { MainWindow } from "../MainWindow/MainWindow"
import { Spin } from 'antd';
import { store } from "../../stores/StatisticStore";
import { observer } from "mobx-react";

export const MainPage = observer(() => {
    useEffect(()=>{
        console.log("store.loading")
        console.log(store.loading)
        console.log(store.file)
        console.log(`store.file == undefined && !store.loading = ${store.file == undefined && !store.loading}`)
    }, [store.loading, store.file])
    return (
        <>
            {store.file == undefined && !store.loading && <DragNDropFiles setFile={(file) => store.setFile(file)} />}
            {store.file !== undefined && !store.loading && <MainWindow />}
            {store.loading && <Spin size="large">
            </Spin>}
        </>
    )
})