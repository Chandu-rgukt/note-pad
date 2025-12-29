export const wordsCount=(data:string | undefined):number=>{
    if(!data.trim()) return 0;

    return data
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
}