




const servers= [
    "http://server1.example.com",
    "http://server2.example.com",
    "http://server3.example.com",
    "http://server4.example.com"
]

let current = 0

function getNextServer(){
    const server = servers[current]
    current = (current + 1 ) % servers.length
    return server
}

for (let i = 1; i<= 10; i++){
    console.log(`Request ${i} goes to ${getNextServer()}`)
}

