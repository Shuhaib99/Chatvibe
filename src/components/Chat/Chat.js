import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChatBox from '../ChatBox'
import { createChat, findChat, userChats } from '../../redux/ChatSlice'
import Card from '../Card'
import Conversation from '../Conversation'
import Layout from '../Layout'
import PostFormCard from '../PostFormCard'
import { io } from 'socket.io-client'
import './Chat.css'
import Search from '../Search'
function Chat() {

  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState([])
  const [user, setUser] = useState("")
  const [onlineUsers, setOnlineUsers] = useState([])
  const [sendMessage, setSendMessage] = useState(null)
  const [recievedMessage, setRecievedMessage] = useState(null)
  const chatActn = useSelector(state => state.chatSlice.isChat)
  const socket = useRef()
  const dispatch = useDispatch()
  // const userid = useSelector(state => state.auth.user)
  // console.log(userid,"newwwwwwwwwwwww");

  useEffect(() => {
    console.log(chatActn,"chatACtion in chat");
    if (chatActn !== "") {
      dispatch(createChat({recieverid:chatActn})).then((res) => {
        setCurrentChat(res.payload.result)
      })

    }
  }, [chatActn])

  useEffect(() => {

    dispatch(userChats()).then((res) => {
      setChats(res.payload.chat)
      setUser(res.payload.user)
      // console.log(res.payload.user,"newwwww");
    })

  }, [])

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage)
    }

  }, [sendMessage])

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_CHATURL)
    socket.current.emit("new-user-add", user)
    socket.current.on('get-users', (users) => {
      // console.log(users,"newUserusersesrsersers");
      setOnlineUsers(users)

    })
  }, [user])

  useEffect(() => {

    socket.current.on("receive-message", (data) => {
      // console.log(data,"recievedMssgs");
      setRecievedMessage(data)
    })
  }, [chats])



  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user)
    const online = onlineUsers.find((user) => user.userId === chatMember)
    // console.log(online,"Is Online");
    return online ? true : false

  }

  return (
    <div className='w-full fixed bottom-5 -ml-5'>
      <div className='w-72 md:w-80 ml-auto bg-black/90 rounded-lg text-center'>

        <div className='overflow-auto w-full rounded-md postComments flex gap-3 p-3'>
          {chats?.slice(0).reverse().map(chat => (
            <div key={chat?._id}>
              <div onClick={() => { setCurrentChat(chat) }}>
                <Conversation data={chat} currentuserid={user} online={checkOnlineStatus(chat)} />
              </div>
            </div>
          ))}
        </div>
        <hr />
        <div className=''>
          <ChatBox chat={currentChat} currentuserid={user}
            setSendMessage={setSendMessage} recieveMessage={recievedMessage} />
        </div>

      </div>
    </div>

  )

}

export default Chat
