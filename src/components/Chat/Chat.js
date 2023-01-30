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
import Search from '../Search'
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
    <div>
      <div className='Chat'>
        <Search />
        <div className='md:mt-32 mt-24'>
          <Layout>
            <PostFormCard />
            <Card>
              <div className=''>
                {chats?.map(chat => (
                  <div key={chat?._id}>
                    <div onClick={() => { setCurrentChat(chat) }}>
                      <Conversation data={chat} currentuserid={user} online={checkOnlineStatus(chat)} />
                    </div>
                  </div>
                ))}
              </div>

            </Card>
            <Card>
              <div className=''>
                <ChatBox chat={currentChat} currentuserid={user}
                  setSendMessage={setSendMessage} recieveMessage={recievedMessage} />
              </div>
            </Card>
          </Layout>
        </div>
      </div>
    </div>
  )

}

export default Chat
