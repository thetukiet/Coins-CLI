
export {}

if (!String.prototype.hasOwnProperty('isNullOrEmpty')) {
    String.prototype.isNullOrEmpty = function (): boolean {
        return (!this || this.length === 0 );
    }
}

if (!String.prototype.hasOwnProperty('toAny')) {
    String.prototype.toAny = function (): any {
        let tempValue: any = this;
        return tempValue;
    }
}
