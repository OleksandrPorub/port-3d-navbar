
export const generateId = () => (
    Math.random().toString(16).slice(2) + new Date().getTime().toString(36)
);

export const dateToString = () => {

    function addNulltoSymbol (symbol) {
        (symbol.length<2)&&(symbol = "0"+symbol);
        return symbol;
    }
    
    const now = new Date();
    const day = addNulltoSymbol(now.getDate().toString());
    const month = addNulltoSymbol((now.getMonth()+1).toString());
    const year = addNulltoSymbol(now.getFullYear().toString());
    const hours = addNulltoSymbol(now.getHours().toString());
    const minutes = addNulltoSymbol(now.getMinutes().toString());
    const seconds = addNulltoSymbol(now.getSeconds().toString());

    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`
};
