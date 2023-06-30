import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box } from "@chakra-ui/react"
import { ChatState } from "../context/ChatProvider"
import SideDrawer from '../components/miscellaneous/SideDrawer'
import MyChats from '../components/MyChats'
import ChatBox from '../components/ChatBox'

const ChatPage = () => {

    const { user } = ChatState(); 

    return (
        
        <div style={{width:"100%"}}>

        { user && <SideDrawer/> }

        <Box
            d="flex"
            justifyContent="space-between"
            w="100%"
            h="91.5vh"
            p="10px">
            
            {user && <MyChats/>} 
            {user && <ChatBox/>}
        </Box>
    </div>
    );
    // const [chats, setChats] = useState([])
    // const fetchChats = async () => {
    //     const { data } = await axios.get("http://localhost:5000/api/chat");
    //     setChats(data);
    // }
    // useEffect(() => {
    //     fetchChats();
    // }, [])
    //{chats.map((chat) => <div key={chat.id}>{chat.chatName}</div>)}
    //return <div> </div>
}

export default ChatPage;
//nppm i axios