#!/usr/bin/env node
import program from "commander";
import pkg from "../package.json";
import {checker} from "./checker";

program
    .version(pkg.version)
    .command('view')
    .description('View Coin Data')
    .option(
        '--token <string>',
        'Input coin IDs. Ex: BTC,ETH...',
        '' // default value
    )
    .option(
        '--date <string>',
        'Input specific date to view dd-MM-yyyy. Ex: 25-10-2021',
        '' // default value
    )
    .action((cmd: any) => checker.process(cmd));

program.parse(process.argv);

