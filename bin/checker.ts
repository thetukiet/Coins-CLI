import {CryptoAPI} from "../lib/CryptoAPI";
import {CsvProcessor} from "../lib/CsvProcessor";
import config from "../config.json";

import '../utils/object';

const colors = require('colors');


class Checker {
    async process(cmd: any) {
        try {
            const csvProcessor = new CsvProcessor();
            const api = new CryptoAPI(config.apiKey);
            cmd = this.setDefaultCmdValue(cmd);

            // Get Transaction Log data
            let checkingTokenString;

            // Get prices from API
            if (cmd.token.isNullOrEmpty()) {
                if (cmd.date.isNullOrEmpty()) {
                    console.log("No token input. Checking with latest transaction history tokens...".toAny().green);
                    const latestTokens = await csvProcessor.getLatestTokens();
                    console.debug(latestTokens);
                    checkingTokenString = latestTokens.join(',');
                } else {
                    console.log(`No token input. Checking with transaction tokens on ${cmd.date.bold}...`.toAny().green);
                    const checkingTokens = await csvProcessor.getTokensByDate(cmd.date);
                    checkingTokenString = checkingTokens.join(',');
                }

                if (checkingTokenString.isNullOrEmpty()) {
                    console.log("No token defined".toAny().red);
                } else {
                    await api.getData(checkingTokenString, cmd.cur);
                }
            } else {
                checkingTokenString = cmd.token;
                if (cmd.date.isNullOrEmpty()) {
                    console.log(`Checking with input tokens ${cmd.token.bold}...`.toAny().green);
                    await api.getData(checkingTokenString, cmd.cur);
                } else {
                    console.log(`Checking with input tokens ${cmd.token.bold} and on input date ${cmd.date.bold}...`.toAny().green);
                    await api.getDataByDate(checkingTokenString, cmd.cur, cmd.date);
                }
            }
            // Add empty line at end
            console.log("");
        } catch (err: any) {
            console.error(err.message.red);
        }
    }

    private setDefaultCmdValue(cmd: any) {
        if (cmd.cur == null)
            cmd.cur = "USD";

        return cmd;
    }
};

export const checker = new Checker();
