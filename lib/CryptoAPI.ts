import axios from "axios";
import '../utils/currency';
import '../utils/datetime';
import {Table} from "console-table-printer";

const {printTable} = require('console-table-printer');
const colors = require('colors');

export class CryptoAPI {
    apiKey: any;
    baseUrl: any;
    dateUrl: any;

    constructor(apiKey: any) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://min-api.cryptocompare.com/data/pricemulti';
        this.dateUrl = 'https://min-api.cryptocompare.com/data/v2/histoday';
    }

    async getData(coinOption: any, curOption: any) {
        try {
            let coins: any[];
            coins = coinOption.split(',');

            const res = await axios.get(
                `${this.baseUrl}?api_key=${this.apiKey}&fsyms=${coinOption}&tsyms=${curOption}`
            );

            const printTable = new Table({
                columns: [
                    { name: 'coin', alignment: 'center', color: 'green', title: '  Coin  '.toAny().blue },
                    { name: 'price', alignment: 'right', color: 'yellow', title: ' Price'.toAny().blue }
                ],
            });

            for(let coin of coins){
                let coinNode = res.data[coin.trim()];
                let price = coinNode['USD'];
                printTable.addRow({ coin: coin.green, price: price.toString().toUSD().yellow.bold });
            }

            console.log('Done\n'.toAny().green);
            printTable.printTable();
        } catch (err) {
            handleAPIError(err);
        }
    }


    async getDataByDate(coinOption: any, curOption: any, date: string) {
        try {
            let coins: any[];
            coins = coinOption.split(',');

            const printTable = new Table({
                columns: [
                    { name: 'coin', alignment: 'center', title: '  Coin  '.toAny().blue },
                    { name: 'price', alignment: 'right', title: ' Price'.toAny().blue },
                    { name: 'date', title: ' Latest datetime from API '.toAny().blue }
                ],
            });

            for(let coin of coins){
                let timeStamp = date.toTimestamp();
                let maxTimeStamp = timeStamp.getMaxTimestamp();
                const res = await axios.get(
                    `${this.dateUrl}?api_key=${this.apiKey}&fsym=${coin.trim()}&tsym=${curOption}&toTs=${maxTimeStamp}`
                );
                let timeNodes = res.data['Data']['Data'];
                let latestPrice = timeNodes[timeNodes.length - 1]['open'];
                let latestTimeStamp = timeNodes[timeNodes.length - 1]['time'];

                printTable.addRow({ coin: coin.trim().green, price: latestPrice.toString().toUSD().yellow.bold, date: latestTimeStamp.toDateTimeString() });
            }

            console.log('Done\n'.toAny().green);
            printTable.printTable();
        } catch (err) {
            handleAPIError(err);
        }
    }
}


function handleAPIError(err: any) {
    if (err.response.status === 401) {
        throw new Error('Your API key may not valid');
    } else if (err.response.status === 404) {
        throw new Error('Your API is not responding');
    } else {
        throw new Error('Something went wrong');
    }
}

