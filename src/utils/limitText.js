export function limitText(text, limit) {
    if(text.length <= limit){
        return text
    }
    let n;
    n = text.slice(0, limit)
    n = n + "..."
    return n
}