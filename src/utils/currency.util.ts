export class CurrencyUtil {
    static convertToCurrency(value: number, currency: string = 'USD'): string {
        return !!value ? value.toLocaleString('en-US', { style: 'currency', currency }) : '';
    }

}