import { Avatar, Drawer, Input, MenuList, Tooltip } from '@mui/material';
import React,{ useState } from 'react';
import { Box, Text } from "@chakra-ui/layout";
import {BellIcon,ChevronDownIcon} from "@chakra-ui/icons"
import { Button } from "@chakra-ui/button";
import { DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Menu, MenuButton, MenuDivider,MenuItem, Spinner, useToast } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import { ChatState } from '../../context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';
import ChatLoading from '../ChatLoading';
import axios from 'axios';
import UserListItem from '../UserListItem';


const SideDrawer = () => {

    const [search,setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading,setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();

    const { user, setSelectedChat, chats, setChats } = ChatState(); 
    const navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
    };

    const toast= useToast();

    const handleSearch = async() => {
        if(!search){
            toast({
                title: "Please Enter Something in search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left"
            });
            return;
        }

    try{
        setLoading(true)

        const config ={
            headers:{
                Authorization: `Bearer ${user.token}`,
            },
        };

        const { data } = await axios.get(`/api/user?search=${search}`,config);

        setLoading(false);
        setSearchResult(data);

    } catch (error) {
        toast({
                title: "Error Occured",
                description:"Failed to load the search results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

    const accessChat = async(userId) => {
        try{
            setLoadingChat(true)

            const config={
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const {data} = await axios.post('/api/chats',{userId},config);

            if(!chats.find((c) => c._id === data._id)) setChats([data,...chats]);

            setSelectedChat(data);
            setLoadingChat(false);
            onClose();

        } catch(error) {
            toast({
                title: "Error fetching the chat",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    };

  return (
    <>
    <Box>
        <Tooltip 
        label="Search Users to chat"
        hasArrow
        placement="bottom-end"
        >
            <Button variant="ghost" onClick={onOpen}>
                <i class="fa-solid fa-magnifying-glass"></i>
                <Text d={{base:"none",md:"flex"}}>
                    Search User
                </Text>
            </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="work sans"></Text>
        <div>
            <Menu>
                <MenuButton p={1}>
                    <BellIcon fontSize="2xl" m={1}/>
                </MenuButton>
                {/* <MenuList></MenuList> */}
            </Menu>

            <Menu>
                <MenuButton as={Button} rightIcon={ChevronDownIcon}>
                    <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic}/>
                </MenuButton>
                
                <MenuList>
                    <ProfileModal user={user}>
                        {/* <MenuItem>My Profile</MenuItem> */}
                        </ProfileModal>
                        <MenuDivider></MenuDivider>
                        <MenuItem onClick={logoutHandler}>Logout</MenuItem>  
                    
                </MenuList>
            </Menu>
        </div>
    </Box>

    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay/>
        <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>

            <DrawerBody>
            <Box d="flex" pb={2}>
                <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                />
                <Button onClick={handleSearch}
                >   Go
                </Button>
            </Box>
            {loading? (
                <ChatLoading/>
            ): 
            (
                searchResult?.map(user=>(
                    <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={()=>accessChat(user._id)}
                    />
                ))
            )}
            {loadingChat && <Spinner ml="auto" d="flex"/>}
            </DrawerBody>
        </DrawerContent>
        
    </Drawer>
  </>);
}

export default SideDrawer;