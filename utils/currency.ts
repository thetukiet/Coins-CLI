
export {}

if (!String.prototype.hasOwnProperty('toUSD')) {
    String.prototype.toUSD = function (): string {
        let formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 2
        });
        let value: number = +this;
        return formatter.format(value);
    }
}
