import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChatBox from '../ChatBox'
import { userChats } from '../../redux/ChatSlice'
import Card from '../Card'
import Conversation from '../Conversation'
import Layout from '../Layout'
import PostFormCard from '../PostFormCard'
import './Chat.css'
function Chat() {

  const [chats, setChats] = useState([])
  const [currentChat,setCurrentChat]=useState([])
  const[user,setUser]=useState("")
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
                  {chats?.map((chat) => (
                    <div onClick={()=>{setCurrentChat(chat)}}>
                      <Conversation data={chat} currentuserid={user} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <div className='Right-side-chat'>
              <ChatBox chat={currentChat} currentuserid={user}/> 
            </div>
          </Card>
        </Layout>
      </div>
    </div>
  )
 
}

export default Chat
