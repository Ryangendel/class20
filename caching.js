const express = require("express")
const app = express()

const cache = new Map()
const TTL_MS = 10000

function getData(){
    return new Promise ((resolve, reject)=>{
        setTimeout(()=> resolve({data:"fresh data " + new Date().toISOString() }), 500)
    })
}




app.get("/api/data", async (req, res)=>{
    const key = "data"
    const now = Date.now()
    const hit = cache.get(key)

    if(hit && hit.expires> now){
        console.log(hit.expires)
        return res.json({source:"cache", ...hit.value})
    }

    const value = await getData()
    cache.set(key, {expires: now + TTL_MS})
    res.json({source:"origin", ...value})
})

app.listen(3000, ()=>console.log("listening on port 3000"))