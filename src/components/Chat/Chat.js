import React,{useState,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { userChats } from '../../redux/ChatSlice'
import Card from '../Card'
import Conversation from '../Conversation'
import Layout from '../Layout'
import PostFormCard from '../PostFormCard'
import './Chat.css'
function Chat() {

  const [chats,setChats]=useState([])

  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(userChats()).then((res)=>{
      setChats(res.payload)
      
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
                  {chats?.map((chat)=>(
                    <div >                     
                      <Conversation data={chat}/>
                      </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <div className='Right-side-chat'>Right side</div>
          </Card>
        </Layout>
      </div>
    </div>
  )
}

export default Chat
