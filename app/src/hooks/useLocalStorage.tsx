import React, { useEffect, useState } from 'react'

export function useLocalStorage<T>(key: string, intailValue:T|(()=>T)){
  const [value, setValue] = useState(()=>{
    const jsonValue = localStorage.getItem(key)
    if(jsonValue == null){
        if(typeof intailValue == "function"){
            return (intailValue as ()=>T)()
        }else{
            return intailValue
        }

    }else{
        return JSON.parse(jsonValue);
    }
  })

  useEffect(()=>{
    localStorage.setItem(key,JSON.stringify(value));
  },[key,intailValue])

  return [value, setValue] as [T,typeof setValue]
}

