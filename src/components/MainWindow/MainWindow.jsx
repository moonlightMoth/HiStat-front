import { useEffect, useState } from "react";
import { store } from "../../stores/StatisticStore"
import "./MainWindow.css"
import { Scatter } from "react-chartjs-2"
import { observer } from "mobx-react";

export const MainWindow = observer(() => {
    const corr = store.initialState.corr;
    const [tableStDevVar, setTableStDevVar] = useState([])
    const [polim, setPolim] = useState("1")
    useEffect(() => {
        setTableStDevVar(store.makeTableStdevVar());
    }, [corr])


    const [doble, setDoble] = useState([store.initialState.sampling.names[0],store.initialState.sampling.names[1]])
    const [dataScatter, setDataScatter] = useState()







    const options = {

        responsive: true,
        maintainAspectRatio: false,

        scales: {

            x: {

                // beginAtZero: true,

                // title: {

                //     display: true,

                //     text: "Sales",

                // },

            },

            y: {

                // beginAtZero: true,

                // title: {

                //     display: true,

                //     text: "Expenses",

                // },

            },

        },

        plugins: {

            legend: {

                position: "top",

            },

            // title: {

            //     display: true,

            //     text: "Регрессия",

            // },

        },

    }

    const handleChageInputHorizontal = (data) => {
        setDoble((prev) => [data.target.value, prev[1]])
        console.log(data.target.value)
    }

    const handleChageInputVertical = (data) => {
        setDoble((prev) => [prev[0], data.target.value])
        console.log("test", data.target.value)
    }

    useEffect(() => {
        console.log(doble)
    }, [doble])




    useEffect(() => {
        const data = {

            labels: [],

            datasets: [

                {

                    label: "Исходная выборка",

                    data: store.makeScatter(doble[0], doble[1]),

                    backgroundColor: "rgba(128, 128, 128)",

                    borderColor: "rgb(53, 162, 235)",

                    borderWidth: 1,

                    pointRadius: 5,
                    // showLine: true,

                },
                {

                    label: "Регрессия",

                    data: store.makePolinomial(doble[0], doble[1], polim),

                    backgroundColor: "rgba(0, 162, 235)",

                    borderColor: "rgb(0, 162, 235)",

                    borderWidth: 1,

                    pointRadius: 3,
                    showLine: true,

                },
                {

                    label: "Выбросы",

                    data: store.makeAnomal(doble[0], doble[1], polim),

                    backgroundColor: "rgba(0, 162, 235)",

                    borderColor: "rgb(255, 43, 43)",

                    borderWidth: 3,

                    pointRadius: 7,
                    showLine: false,

                },

            ],

        }
        // store.makePolinomial(doble[0], doble[1], "1")
        setDataScatter(data)
    }, [doble, polim,corr])

    const handlePolimChange = (data) => {
        setPolim(data.target.value)
    }

    return (
        <section className="mainWindow">
            <div className="graph">
                <table style={{ width: "100%", height: "90%" }}>
                    <tbody>
                        <tr>
                            <td>
                                <section className="names vertical">
                                    {store.initialState.sampling.names.map((el, ind) => {
                                        return (
                                            <div key={`vertical ${el}`}>
                                                < input type="radio" id={el} name="valueVertical" value={el} onChange={handleChageInputVertical} checked={el == doble[1]} />
                                                <label htmlFor="valueVertical">{el}</label>
                                            </div>)
                                    })}
                                </section>
                            </td>
                            <td>
                                {dataScatter && <Scatter data={dataScatter} options={options}></Scatter>}
                            </td>
                            <td rowSpan={2}>
                                <div>
                                    < input type="radio" id={"polim1"} name="Polim1" value={"1"} checked={polim == "1"} onChange={handlePolimChange}/>
                                    <label htmlFor="Polim1">1-я степень</label>
                                </div>
                                <div>
                                    < input type="radio" id={"polim2"} name="Polim1" value={"2"} checked={polim == "2"} onChange={handlePolimChange}/>
                                    <label htmlFor="Polim2">2-я степень</label>
                                </div>
                                <div>
                                    < input type="radio" id={"polim3"} name="Polim1" value={"3"} checked={polim == "3"} onChange={handlePolimChange}/>
                                    <label htmlFor="Polim3">3-я степень</label>

                                </div>
                                <div>
                                    < input type="radio" id={"polim4"} name="Polim1" value={"4"} checked={polim == "4"} onChange={handlePolimChange}/>
                                    <label htmlFor="Polim4">4-я степень</label>
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td colSpan={2}> <section className="names horizontal">
                                {store.initialState.sampling.names.map((el, ind) => {
                                    return (
                                        <div key={`horizontal ${el}`}>
                                            < input type="radio" id={el} name="valueHorizontal" value={el} onChange={handleChageInputHorizontal} checked={el == doble[0]} />
                                            <label htmlFor="valueHorizontal">{el}</label>
                                        </div>)
                                })}
                            </section>

                            </td>


                        </tr>
                    </tbody>
                </table>


            </div>
            <div className="tables">
                <section className="container">
                    <h3> Среднеквадратическое отклонения и дисперсии</h3>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>s</th>
                                    <th>s²</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableStDevVar.map((row, index) => {
                                    return (
                                        <tr key={index}>
                                            {row.map((cell, ind) => {
                                                return (<td key={ind}>{ind == 0 ? <b>{cell}</b> : cell.toFixed(2)}</td>)
                                            })}
                                        </tr>
                                    )
                                })}
                            </tbody>

                        </table>
                    </div>

                </section>
                <section className="container">
                    <h3> Матрица корреляции</h3>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    {store.initialState.sampling.names.map((el, ind) => {
                                        return (
                                            <th key={ind}>
                                                {el}
                                            </th>
                                        )
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {corr.map((row, index) => {
                                    return (
                                        <tr key={index}>
                                            <td key={index + 1}> <b>{store.initialState.sampling.names[index]}</b></td>
                                            {row.map((cell, ind) => {
                                                const color = store.getColor(cell);
                                                const textColor = store.getTextColor(color);
                                                return (<td key={ind} style={{ backgroundColor: color, color: textColor }} >{cell.toFixed(2)}</td>)
                                            })}
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>


                </section>

            </div>
        </section>
    )
})