
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import { TransactionLog } from '../models/TransactionLog';

export class CsvProcessor {
    csvData: TransactionLog[] = [];

    constructor() {
    }

    private readTransactionLogData() {
        this.csvData = [];
        return new Promise<TransactionLog[]>((resolve, reject) =>{
            fs.createReadStream(path.resolve(__dirname, '..', 'log', 'transaction_log.csv'))
                .pipe(csv.parse({ headers: true }))
                .on('data', (row) =>{
                    let log = new TransactionLog(row.timestamp, row.transaction_type, row.token, row.amount);
                    this.csvData.push(log);
                })
                .on('error', reject)
                .on('end', () => {
                    resolve(this.csvData);
                });
        });
    }


    private findTokensByTimestamps(csvData: TransactionLog[], minTimestamp: number, maxTimestamp: number): string[] {
        let tokens: string[] = [];

        // Get unique tokens from latest date in CSV data
        csvData.filter(x => x.timestamp >= minTimestamp && x.timestamp <= maxTimestamp).map(x => {
            if (!tokens.includes(x.token))
                tokens.push(x.token);
            return x.token;
        });

        return tokens;
    }


    private findLatestTokens(csvData: TransactionLog[]): string[] {
        let maxTimestamp: number = Math.max.apply(Math, csvData.map(function (obj: TransactionLog) {
            return obj.timestamp;
        }));
        let minTimestamp = maxTimestamp.getMinTimestamp();
        return this.findTokensByTimestamps(csvData, minTimestamp, maxTimestamp);
    }

    private findTokensByDate(csvData: TransactionLog[], date: string): string[] {
        let minTimestamp: number = date.toTimestamp();
        let maxTimestamp = minTimestamp.getMaxTimestamp();
        return this.findTokensByTimestamps(csvData, minTimestamp, maxTimestamp);
    }

    private async getFindingData(forceClearCache: boolean) {
        let findingData: TransactionLog[] = this.csvData;
        if (forceClearCache) {
            findingData = await this.readTransactionLogData();
        } else {
            if (this.csvData.length < 1) {
                findingData = await this.readTransactionLogData();
            }
        }

        return findingData;
    }



    /*---------------- PUBLIC FUNCTIONS ------------------*/

    async getLatestTokens(forceClearCache: boolean = true) {
        let findingData: TransactionLog[] = await this.getFindingData(forceClearCache);
        return this.findLatestTokens(findingData);
    }


    async getTokensByDate(date: string, forceClearCache: boolean = true) {
        let findingData: TransactionLog[] = await this.getFindingData(forceClearCache);
        return this.findTokensByDate(findingData, date);
    }
}
