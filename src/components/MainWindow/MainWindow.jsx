import { useEffect, useState } from "react";
import { store } from "../../stores/StatisticStore"
import "./MainWindow.css"
import { Scatter } from "react-chartjs-2"
import { observer } from "mobx-react";
import { Radio } from 'antd';

import { CustomButton } from "../CustomButton/CustomButton";


const optionsButton = [
    { label: 'Линейная', value: '1' },
    { label: '2-ая степень', value: '2' },
    { label: '3-ая степень', value: '3' },
    { label: '4-ая степень', value: '4' },
    { label: 'Экспоненицальная', value: 'exp' },
    { label: 'Логарифмическая', value: 'log' },
    { label: 'Показательная', value: 'pow' },

]

export const MainWindow = observer(() => {
    const corr = store.initialState.corr;
    const [tableStDevVar, setTableStDevVar] = useState([])
    const [polim, setPolim] = useState("1")
    const [text, setText] = useState()
    useEffect(() => {
        setTableStDevVar(store.makeTableStdevVar());
    }, [corr])



    const [doble, setDoble] = useState([store.initialState.sampling.names[0], store.initialState.sampling.names[1]])
    const [dataScatter, setDataScatter] = useState()

    const namesVariables = store.initialState.sampling.names.map(item => ({
        label: item,
        value: item
    }))






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

            //     text: store.textFormula,
            //     html: true,

            // },

        },

    }

    const getBackgroundColor = (value) => {
         // Для значений <= 0 фон будет белым
    if (value <= 0) {
        return 'rgba(255, 255, 255, 1)'; // Белый
    }

    const clampedValue = Math.min(value, 1);
    return `rgba(0, 200, 50, ${clampedValue})`;
    };

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

                    pointRadius: 2,
                    // showLine: true,

                },
                {

                    label: "Регрессия",

                    data: store.makePolinomial(doble[0], doble[1], polim),

                    backgroundColor: "rgba(0, 200, 50, 255)",

                    borderColor: "rgb(0, 200, 50)",

                    borderWidth: 1,

                    pointRadius: 3,
                    showLine: true,

                },
                // {

                //     label: "Выбросы",

                //     data: store.makeAnomal(doble[0], doble[1], polim),

                //     backgroundColor: "rgba(0, 162, 235)",

                //     borderColor: "rgb(255, 43, 43)",

                //     borderWidth: 3,

                //     pointRadius: 7,
                //     showLine: false,

                // },

            ],

        }
        // store.makePolinomial(doble[0], doble[1], "1")
        setDataScatter(data)
        setText(formula())
    }, [doble, polim, corr])

    const handlePolimChange = (data) => {

        console.log(data)
        setPolim(data.target.value)
    }

    const formula = () => {
        const currentRegressions = store.initialState.regression[doble[0]]?.[doble[1]]?.[polim]
        console.log(polim)
        if (currentRegressions)
            switch (polim) {
                case "log":
                    return <>
                        y = {currentRegressions.coefs[0]}+ {currentRegressions.coefs[1]}* ln(x)
                    </>
                    break;
                case "exp":

                    return <>
                        y = {currentRegressions.coefs[0]}*e<sup>{currentRegressions.coefs[1]}*x</sup>
                    </>


                case "pow":
                    console.log("hi")
                    return <>
                        y = {currentRegressions.coefs[0]}*x<sup>{currentRegressions.coefs[1]}</sup>
                    </>
                case "1":
                    return <>
                        y = {currentRegressions.coefs[0]} {currentRegressions.coefs[1] > 0 ? "+" : ""} {currentRegressions.coefs[1]}*x
                    </>
                case "2":
                    return <>
                        y = {currentRegressions.coefs[0]} {currentRegressions.coefs[1] > 0 ? "+" : ""} {currentRegressions.coefs[1]}*x {currentRegressions.coefs[2] > 0 ? "+" : ""}
                        {currentRegressions.coefs[2]}*x<sup>2</sup>
                    </>
                case "3":
                    return <>
                        y = {currentRegressions.coefs[0]} {currentRegressions.coefs[1] > 0 ? "+" : ""} {currentRegressions.coefs[1]}*x {currentRegressions.coefs[2] > 0 ? "+" : ""}
                        {currentRegressions.coefs[2]}*x<sup>2</sup>{currentRegressions.coefs[3] > 0 ? "+" : ""}{currentRegressions.coefs[3]}*x<sup>3</sup>
                    </>

                default:
                    return <>
                        y = {currentRegressions.coefs[0]} {currentRegressions.coefs[1] > 0 ? "+" : ""} {currentRegressions.coefs[1]}*x {currentRegressions.coefs[2] > 0 ? "+" : ""}
                        {currentRegressions.coefs[2]}*x<sup>2</sup>{currentRegressions.coefs[3] > 0 ? "+" : ""}{currentRegressions.coefs[3]}*x<sup>3</sup>{currentRegressions.coefs[4] > 0 ? "+" : ""}
                        {currentRegressions.coefs[4]}*x<sup>4</sup>
                    </>

            }
    }

    return (
        <section className="mainWindow">
            <h5>{text}</h5>
            <div className="graph">

                <table>
                    <tbody>
                        <tr>
                            <td>
                                <section className="names vertical">
                                    {/* {store.initialState.sampling.names.map((el, ind) => {
                                        return (
                                            <div key={`vertical ${el}`}>
                                                < input type="radio" id={el} name="valueVertical" value={el} onChange={handleChageInputVertical} checked={el == doble[1]} />
                                                <label htmlFor="valueVertical">{el}</label>
                                            </div>)
                                    })} */}
                                    <Radio.Group
                                        options={namesVariables}
                                        onChange={handleChageInputVertical}
                                        value={doble[1]}
                                        optionType="button"
                                        buttonStyle="solid"
                                    />

                                </section>
                            </td>
                            <td>
                                {dataScatter && <Scatter data={dataScatter} options={options}></Scatter>}
                            </td>
                            <td rowSpan={2} className="vericalLabels">
                                <div>
                                {/* <CustomButton label={"Модель"} checked={false} button={false} /> */}
                                <label style={{width: "100%", textAlign: "center"}}>Модель</label>
                                    {optionsButton.map(item => {
                                        return (
                                            <CustomButton label={item.label} value={item.value} checked={item.value == polim} handleClick={handlePolimChange}/>
                                        )
                                    })}
                                </div>
                                <div>
                                <label style={{width: "100%", textAlign: "center"}}>R<sup>2</sup></label>

                                {optionsButton.map(item => {
                                        return (
                                            <CustomButton label={store.initialState.regression?.[doble[0]]?.[doble[1]]?.[item.value]?.det?.toFixed(2)} value={item.value} checked={false} button={false} style={{backgroundColor: getBackgroundColor(store.initialState.regression?.[doble[0]]?.[doble[1]]?.[item.value]?.det?.toFixed(2)), color: store.initialState.regression?.[doble[0]]?.[doble[1]]?.[item.value]?.det < 0.5 ? "black" : "white"}}/>
                                        )
                                    })}

                                </div>



                                {/* <label>Модель</label> */}
                                {/* <Radio.Group
                                    options={optionsButton}
                                    onChange={handlePolimChange}
                                    value={polim}
                                    optionType="button"
                                    buttonStyle="solid"
                                /> */}
                                {/* <div className="det">
                                    <label>
                                        {store.initialState.regression?.[doble[0]]?.[doble[1]]?.["1"]?.det?.toFixed(2)}
                                    </label>
                                    <label>
                                        {store.initialState.regression?.[doble[0]]?.[doble[1]]?.["2"]?.det?.toFixed(2)}
                                    </label>
                                    <label>
                                        {store.initialState.regression?.[doble[0]]?.[doble[1]]?.["3"]?.det?.toFixed(2)}
                                    </label>
                                    <label>
                                        {store.initialState.regression?.[doble[0]]?.[doble[1]]?.["4"]?.det?.toFixed(2)}
                                    </label>
                                    <label>
                                        {store.initialState.regression?.[doble[0]]?.[doble[1]]?.["exp"]?.det?.toFixed(2)}
                                    </label>
                                    <label>
                                        {store.initialState.regression?.[doble[0]]?.[doble[1]]?.["log"]?.det?.toFixed(2)}
                                    </label>
                                    <label>
                                        {store.initialState.regression?.[doble[0]]?.[doble[1]]?.["pow"]?.det?.toFixed(2)}
                                    </label>
                                </div> */}



                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td colSpan={2}> <section className="names horizontal">
                                {/* {store.initialState.sampling.names.map((el, ind) => {
                                    return (
                                        <div key={`horizontal ${el}`}>
                                            < input type="radio" id={el} name="valueHorizontal" value={el} onChange={handleChageInputHorizontal} checked={el == doble[0]} />
                                            <label htmlFor="valueHorizontal">{el}</label>
                                        </div>)
                                })} */}
                                <Radio.Group
                                    options={namesVariables}
                                    // onChange={onChange4}
                                    onChange={handleChageInputHorizontal}
                                    value={doble[0]}
                                    optionType="button"
                                    buttonStyle="solid"
                                />
                            </section>

                            </td>


                        </tr>
                    </tbody>
                </table>


            </div>
            <div className="tables">
                <section className="container">
                    <h3> Среднеквадратические отклонения и дисперсии</h3>
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
                                            <th key={ind} style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
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
