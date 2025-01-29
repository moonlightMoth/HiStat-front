import { useEffect, useState } from "react"
import { DragNDropFiles } from "../DragNDropFiles/DragNDropFiles"
import { MainWindow } from "../MainWindow/MainWindow"
import { Spin } from 'antd';
import { store } from "../../stores/StatisticStore";
import { observer } from "mobx-react";

import { message } from 'antd';

export const MainPage = observer(() => {
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        store.setMessageApi(messageApi);
    }, [])
    return (
        <>
            {contextHolder}
            {store.file == undefined && !store.loading && <DragNDropFiles setFile={(file) => store.setFile(file)} messageApi={messageApi} />}
            {store.file !== undefined && !store.loading && <MainWindow messageApi={messageApi} />}
            {store.loading && <Spin size="large">
            </Spin>}
        </>
    )
})