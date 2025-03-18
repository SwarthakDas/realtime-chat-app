/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client';

const socket=io("http://localhost:8000")
const Page = () => {
  const [name,setName]=useState('')
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{name:string;message:string}[]>([]);

  useEffect(()=>{
    socket.on("message",(message)=>{
      setMessages((messages)=>[...messages,message])
    })
  },[])

  const handleSubmit=(event:any)=>{
    event.preventDefault()
    if(name && message){
      socket.emit("sendMessage",{name,message})
      setName("")
      setMessage("")
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} placeholder="Your name" onChange={(event) => setName(event.target.value)} />
        <input type="text" value={message} placeholder="Your message" onChange={(event) => setMessage(event.target.value)} />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            {message.name}: {message.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Page
