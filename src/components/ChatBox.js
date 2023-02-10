import React, { useState, useEffect, useRef } from 'react'
import InputEmoji from 'react-input-emoji'
import Moment from 'react-moment'
import { useDispatch } from 'react-redux'
import { addMessage, getMessages } from '../redux/ChatSlice'
import { getUser } from '../redux/UserSlice'
import Avatar from './Avatar'


function ChatBox({ chat, currentuserid, setSendMessage, recieveMessage }) {
  const dispatch = useDispatch()
  const [userDataCB, setUserDataCB] = useState([])
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const scroll = useRef()
  const params = {
    userid: {
      id: ""
    }
  }

  useEffect(() => {
    if (recieveMessage !== null && recieveMessage.chatId === chat._id) {
      setMessages([...messages, recieveMessage])
    }
  }, [recieveMessage])

  const handleSend = (e) => {
    if (newMessage != "") {
      e.preventDefault()
      const message = {
        text: newMessage,
        chatid: chat._id,
      }
      dispatch(addMessage(message)).then((res) => {
        setMessages([...messages, res.payload])
        setNewMessage("")
      })

      //send messge to socket server
      const receiverId = chat.members.find((id) => id !== currentuserid);
      setSendMessage({ ...message, receiverId })
    }
  }


  useEffect(() => {
    if (chat.length !== 0) {
      params.userid.id = chat?.members?.find((id) => id !== currentuserid)
      dispatch(getUser(params)).then((res) => {
        setUserDataCB(res?.payload?.otherDetails)
      })
    }
  }, [chat, currentuserid])

  useEffect(() => {
    if (chat.length !== 0) {
      dispatch(getMessages(chat._id)).then((res) => {
        setMessages(res.payload)
        console.log(res);
      })
    }
  }, [chat, currentuserid])

  useEffect(() => {
    scroll.current?.scrollIntoView({ behaviour: "smooth" })
  }, [messages])

  return (
    <div className=''>
      {chat.length !== 0 ? (
        <>
          <>
            <div className='hover:cursor-pointer px-3 p-2'>
              <div>
                <div className='flex items-center gap-2 '>
                  <Avatar url={userDataCB?.profilepic} />
                  <div className='text-white' >
                    <span>{userDataCB?.firstname + " " + userDataCB?.lastname}</span><br />
                  </div>
                </div>
              </div>

            </div>
            <hr />
            <>
              <div className='overflow-auto h-64 md:h-80 postComments '>
                {messages?.map((message) => (
                  <div key={message._id}>
                    {message.senderid === currentuserid ?
                      <div ref={scroll} className='flex flex-row-reverse '>
                        <div className=' items-center rounded-tr-full leading-4 px-5 py-1 mt-1'>
                          <div className=' text-white text-sm'>{message?.text}<br />
                            <p className=' text-gray-700 text-xs'><Moment fromNow>{message.createdAt}</Moment></p>
                          </div>
                        </div>
                      </div>
                      :
                      <div ref={scroll} className='flex flex-grow-0 '>
                        <div className=' items-center bg-black/50 rounded-tl-full leading-4 px-5 py-1 mt-1'>
                          <div className=' text-white  text-sm'>{message?.text}<br />
                            <p className=' text-gray-700 text-xs'><Moment fromNow>{message.createdAt}</Moment></p>
                          </div>
                        </div>
                      </div>
                    }



                  </div>
                ))}
              </div>
            </>
          </>
          <div className='flex mt-3 gap-3 items-center '>

            <InputEmoji
              value={newMessage}
              onChange={setNewMessage}
              placeholder="Type a message"
            />

            <button className='' onClick={handleSend}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>

            </button>
          </div>
        </>
      ) : <div className='text-center'> Tap on the chat to start Conversation... </div>}
    </div>
  )
}


export default ChatBox
