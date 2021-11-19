
export class TransactionLog {
    public readonly timestamp: number;
    public readonly transactionType: string;
    public readonly token: string;
    public readonly amount: number;

    constructor(timestamp: number, transactionType: string, token: string, amount: number) {
        this.timestamp = timestamp;
        this.transactionType = transactionType;
        this.token = token;
        this.amount = amount;
    }
}
