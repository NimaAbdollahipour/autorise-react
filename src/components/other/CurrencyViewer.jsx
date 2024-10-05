export default function CurrencyViewer({ name }) {
    const currencySymbols = {
        POUND: "£",
        TL: "₺",
        USD: "$",
        EURO: "€",
    };
    return <>{currencySymbols[name]}</>;
}
