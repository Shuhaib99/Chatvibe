import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChatBox from '../ChatBox'
import { userChats } from '../../redux/ChatSlice'
import Card from '../Card'
import Conversation from '../Conversation'
import Layout from '../Layout'
import PostFormCard from '../PostFormCard'
import { io } from 'socket.io-client'
import './Chat.css'
function Chat() {

  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState([])
  const [user, setUser] = useState("")
  const [onlineUsers, setOnlineUsers] = useState([])
  const [sendMessage, setSendMessage] = useState(null)
  const [recievedMessage, setRecievedMessage] = useState(null)

  const socket = useRef()
  const dispatch = useDispatch()
  // const userid = useSelector(state => state.auth.user)
  // console.log(userid,"newwwwwwwwwwwww");

  useEffect(() => {
    dispatch(userChats()).then((res) => {
      setChats(res.payload.chat)
      setUser(res.payload.user)
      // console.log(res.payload.user,"newwwww");
    })
  }, [user])

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage)
    }

  }, [sendMessage])

  useEffect(() => {
    socket.current = io('http://localhost:8800')
    socket.current.emit("new-user-add", user)
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users)
      console.log("onlineusers",onlineUsers);
    })
  }, [user])

  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      setRecievedMessage(data)
    })
  }, [])

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user)
    const online = onlineUsers.find((user) => user.userid === chatMember)
    return online ? true : false
  }




  return (
    <div>
      <div className='Chat'>
        <Layout>
          <PostFormCard />
          <Card>
            <div className='Left-side-chat  '>
              Chatvibe
              <div className='Chat-container'>
                <h2>Chats</h2>
                <div className='Chat-list'>
                  {chats?.map(chat => (
                    <div key={chat?._id}>
                      <div onClick={() => { setCurrentChat(chat) }}>
                        <Conversation data={chat} currentuserid={user} online={checkOnlineStatus(chat)}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <div className='Right-side-chat'>
              <ChatBox chat={currentChat} currentuserid={user}
                setSendMessage={setSendMessage} recieveMessage={recievedMessage} />
            </div>
          </Card>
        </Layout>
      </div>
    </div>
  )

}

export default Chat
