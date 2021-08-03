export function limitText(text, limit){
    let n;
    n = text.slice(0, limit)
    n = n + "..."
    return n
}