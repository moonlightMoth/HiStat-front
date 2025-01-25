import { makeAutoObservable, runInAction } from 'mobx';

import axios from 'axios';

class StatisticStore {
    initialState = {
        // "corr": [[0.9999999999999997, 0.2321714089685338, -0.09321811071766652], [0.2321714089685338, 1.0000000000000002, 0.21211064810006228], [-0.09321811071766652, 0.21211064810006228, 1.0000000000000004]]
        "corr": [[0.9999999999999997, 0.2321714089685338, -1], [0.2321714089685338, 1.0000000000000002, 0.21211064810006228], [-0.4, 0.21211064810006228, 1.0000000000000004]],
        "regression": {
            "var1": {
                "var2": {
                    "1": {
                        "coefs": [3.471321695760384, 0.18640897755612018, 0.0, 0.0, 0.0],
                        "anomsx": [],
                        "anomsy": []
                    },
                    "2": {
                        "coefs": [3.6595836507959234, 0.07522344996407071, 0.011294590645667846, 0.0, 0.0],
                        "anomsx": [],
                        "anomsy": []
                    },
                    "3": {
                        "coefs": [2.1790897168893935, 1.6889732868094143, -0.40192907018331425, 0.028404072882253217, 0.0],
                        "anomsx": [],
                        "anomsy": []
                    },
                    "4": {
                        "coefs": [0.7532487341377418, 3.7122739701881073, -1.2316548931630678, 0.15712729177175788, -0.006635060747669286],
                        "anomsx": [],
                        "anomsy": []
                    }
                },
                "var3": {
                    "1": {
                        "coefs": [7.02493765586004, -0.1620947630922509, 0.0, 0.0, 0.0],
                        "anomsx": [],
                        "anomsy": [4]
                    },
                    "2": {
                        "coefs": [2.8742774076721815, 2.289241462336051, -0.24901477552413587, 0.0, 0.0],
                        "anomsx": [],
                        "anomsy": [4]
                    },
                    "3": {
                        "coefs": [2.0771711631965672, 3.1580931602809414, -0.47149648177469317, 0.015292899211358346, 0.0],
                        "anomsx": [],
                        "anomsy": [4]
                    },
                    "4": {
                        "coefs": [10.338544510756037, -8.788333807566232, 4.466553919528451, -0.7520786032683873, 0.03952772735564736],
                        "anomsx": [],
                        "anomsy": [4]
                    }
                }
            },
            "var2": {
                "var1": {
                    "1": {
                        "coefs": [3.0328820116052775, 0.28916827852999294, 0.0, 0.0, 0.0],
                        "anomsx": [],
                        "anomsy": []
                    },
                    "2": {
                        "coefs": [8.915311191433005, -2.9266838023621773, 0.3437956008741665, 0.0, 0.0],
                        "anomsx": [],
                        "anomsy": []
                    },
                    "3": {
                        "coefs": [12.193466400465695, -6.028089931892282, 1.1352964225818596, -0.057687941929302156, 0.0],
                        "anomsx": [],
                        "anomsy": [6]
                    },
                    "4": {
                        "coefs": [1.5079438126995228, 8.669656981655862, -5.145445154979825, 0.9858643359184498, -0.05846977739201975],
                        "anomsx": [],
                        "anomsy": []
                    }
                },
                "var3": {
                    "1": {
                        "coefs": [4.373307543520106, 0.4593810444874453, 0.0, 0.0, 0.0],
                        "anomsx": [],
                        "anomsy": [4]
                    },
                    "2": {
                        "coefs": [3.5911750162218254, 0.8869633315570695, -0.04571134045346881, 0.0, 0.0],
                        "anomsx": [],
                        "anomsy": [4]
                    },
                    "3": {
                        "coefs": [10.49974245352223, -5.649135220072367, 1.6223482213802072, -0.1215752516240407, 0.0],
                        "anomsx": [],
                        "anomsy": [4, 8]
                    },
                    "4": {
                        "coefs": [19.597095211771375, -17.973087646096246, 6.918448107076983, -1.0021236927036625, 0.04935496631932779],
                        "anomsx": [],
                        "anomsy": [4]
                    }
                }
            },
            "var3": {
                "var1": {
                    "1": {
                        "coefs": [4.606185567010224, -0.053608247422698874, 0.0, 0.0, 0.0],
                        "anomsx": [],
                        "anomsy": []
                    },
                    "2": {
                        "coefs": [5.468739317239098, -0.35157450967833626, 0.016614582343444595, 0.0, 0.0],
                        "anomsx": [],
                        "anomsy": []
                    },
                    "3": {
                        "coefs": [4.621031725211196, 0.2629238077362288, -0.07251767306574664, 0.0031556894848989714, 0.0],
                        "anomsx": [],
                        "anomsy": [4]
                    },
                    "4": {
                        "coefs": [4.5767021004830895, 0.5258782219825662, -0.14504681695689214, 0.00949061764185899, -1.747468013650888E-4],
                        "anomsx": [],
                        "anomsy": []
                    }
                },
                "var2": {
                    "1": {
                        "coefs": [3.6463917525772587, 0.09793814432987258, 0.0, 0.0, 0.0],
                        "anomsx": [],
                        "anomsy": []
                    },
                    "2": {
                        "coefs": [4.486953535022671, -0.19243106737598303, 0.016190971225250705, 0.0, 0.0],
                        "anomsx": [],
                        "anomsy": [5]
                    },
                    "3": {
                        "coefs": [5.658893941423628, -1.0419378072805046, 0.1394110792279406, -0.004362549008370298, 0.0],
                        "anomsx": [],
                        "anomsy": [14]
                    },
                    "4": {
                        "coefs": [3.0067551893080235, 2.2232014246656036, -0.7210320592605513, 0.07308016760468661, -0.0021551669511490346],
                        "anomsx": [],
                        "anomsy": []
                    }
                }
            }
        },
        "basic": {
            "stdev": [2.6699979192667715, 2.1437246921084703, 4.642796092394706],
            "var": [7.1288888888888895, 4.595555555555555, 21.555555555555554],

        },
        "sampling": {
            "var1": [1.0, 4.0, 6.0, 3.0, 5.0, 4.0, 9.0, 2.0, 8.0, 1.0, 2.0, 1.0, 4.0, 5.0, 9.0],
            "var2": [2.0, 5.0, 1.0, 4.0, 6.0, 8.0, 2.0, 3.0, 7.0, 5.0, 4.0, 4.0, 3.0, 2.0, 8.0],
            "var3": [3.0, 6.0, 8.0, 1.0, 19.0, 12.0, 5.0, 8.0, 1.0, 3.0, 9.0, 8.0, 7.0, 1.0, 4.0],
            "names": ["var1", "var2", "var3"]
        }
    }

    

    constructor() {
        makeAutoObservable(this)
    }

    getDataState = async (formData) => {
        console.log("test1")
        try{
            console.log("test1")
            const res = 
            await (await fetch('https://api.moonlightmoth.ru/histat', {method: 'POST', body: formData})).json()
            console.log("test2")
            runInAction(()=>{
                this.initialState = res;
                console.log(this.initialState)
            })
           

        }
        catch(e){
            console.log(e)
        }
        // const res = 
        //     fetch('https://api.moonlightmoth.ru/histat', {method: 'POST', body: formData})
        //     .then(response => this.initialState = response.json())
        //     .catch(error => console.log(error));
    }

    makeTableStdevVar() {
        const result = []
        for (let i = 0; i < this.initialState.basic.stdev.length; i++) {
            result.push([this.initialState.sampling.names[i], this.initialState.basic.stdev[i], this.initialState.basic.var[i]])
        }
        return result;

    }

    makeScatter(name1, name2) {
        const result = []
        console.log(name1, name2)
        for (let i = 0; i < this.initialState.sampling[name1]?.length; i++) {
            result.push({ x: this.initialState.sampling[name1]?.[i], y: this.initialState.sampling[name2]?.[i] })
        }

        const sortedData = result.sort((a, b) => a.x - b.x);
        return sortedData
    }

    makePolinomial(name1, name2, pow) {
        if (this.initialState.sampling[name1] && this.initialState.sampling[name2]){

        
            const minX = Math.min(...this.initialState.sampling[name1])
            const maxX = Math.max(...this.initialState.sampling[name1])
            const counts = 100;//this.initialState.sampling[name1]?.length * 2;
            const step = Math.round(((maxX - minX) / (counts - 1)) * 100) / 100;
            const data = []
            const currentRegressions = this.initialState.regression[name1]?.[name2]?.[pow];
            if (currentRegressions)
                for (let i = minX; i <= maxX; i += step) {  // Используем i <= maxX
                    const pointY = currentRegressions.coefs[0] + i * currentRegressions.coefs[1] +
                        i * i * currentRegressions.coefs[2] + i * i * i * currentRegressions.coefs[3] +
                        i * i * i * i * currentRegressions.coefs[4];
                    data.push({ x: i, y: pointY });
                }

            return data;
            // this.initialState.regression[name1][name2]
        }

    }

    makeAnomal(namex, namey, pow) {
        const anomaly = store.initialState.regression[namex]?.[namey]?.[pow]?.anomsy;
        const data = []
        if (anomaly) {
            for (let i = 0; i < anomaly.length; i++) {
                data.push({ x: store.initialState.sampling[namex][anomaly[i]], y: store.initialState.sampling[namey][anomaly[i]] })

            }
        }

        return data;
    }

    generateRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const a = 1; // Прозрачность
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    getColor(value) {
        if (value < 0) {
            // Генерация мягких оттенков синего для отрицательных значений
            // const blueScale = Math.floor((1 - value) * 5); // 10 оттенков синего
            const blueScale = -value * 10 * 25
            return `rgba(0, 0, 255,${-value})`; // Более мягкий синий цвет
        } else {
            // Генерация мягких оттенков красного для положительных значений
            const redScale = value * 10 * 25; // 10 оттенков красного
            return `rgba(255, 0, 0, ${value})`; // Более мягкий красный цвет
        }
    }

    getTextColor(bgColor) {
        const rgb = bgColor.match(/\d+/g); // Получаем RGB компоненты цвета
        const rgba = bgColor.match(/rgba?\((\d+), (\d+), (\d+)(?:, (\d*\.?\d+))?\)/);
        const a = rgba?.[4]
        const r = rgba?.[1]
        if (r == "255" && a && a > 0.5) {
            return "white"
        }
        return "black"
        // const brightness = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]; // Формула для яркости
        // return brightness < 128 ? 'white' : 'black'; // Если фон темный, текст белый, если светлый — черный
    };



}

export const store = new StatisticStore();
