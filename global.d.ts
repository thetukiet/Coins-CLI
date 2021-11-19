export {}

declare global {
    interface String {
        /*
         * Format number string to USD currency
         */
        toUSD(): string;

        /*
         * Convert string to any. This help coloring the text on log output
         */
        toAny(): any;

        /*
         * Parse date string in dd-MM-yyyy format to timestamp
         */
        toTimestamp(): number;

        isNullOrEmpty(): boolean;
    }

    interface Number {
        getMinTimestamp(): number;

        getMaxTimestamp(): number;

        toDateTimeString(): any;
    }
}
