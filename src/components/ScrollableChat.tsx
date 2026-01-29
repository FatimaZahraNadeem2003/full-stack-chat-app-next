import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser, Message } from '../config/ChatLogics'
import { ChatState } from './../Context/ChatProvider';
import { Avatar, Tooltip, Box, Text, Flex, VStack } from '@chakra-ui/react';

interface ScrollableChatProps {
  messages: Message[];
}

const ScrollableChat: React.FC<ScrollableChatProps> = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages && messages.map((m, i) => {
        const isMe = m.sender._id === user._id;
        const isFirstInGroup = i === 0 || messages[i - 1].sender._id !== m.sender._id;

        return (
          <Flex
            key={m._id}
            w="100%"
            justifyContent={isMe ? 'flex-end' : 'flex-start'}
            px={4}
            mb={isSameUser(messages, m, i) ? 1 : 3}
          >
            {!isMe && (
              <Box w="32px" mr={2}>
                {isFirstInGroup ? (
                  <Tooltip label={m.sender.name} placement='bottom-start' hasArrow>
                    <Avatar
                      size='xs'
                      cursor='pointer'
                      name={m.sender.name}
                      src={m.sender.pic}
                    />
                  </Tooltip>
                ) : null}
              </Box>
            )}

            <VStack align={isMe ? 'flex-end' : 'flex-start'} spacing={0} maxW="75%">
              
              {!isMe && isFirstInGroup && (
                <Text 
                  fontSize='xs' 
                  fontWeight='bold' 
                  color='teal.600' 
                  ml={1} 
                  mb={1}
                >
                  {m.sender.name}
                </Text>
              )}

              <Box
                bg={isMe ? '#dcf8c6' : 'white'} 
                color='gray.800'
                borderRadius={isMe 
                    ? '10px 0px 10px 10px' 
                    : '0px 10px 10px 10px' 
                }
                p='6px 12px'
                boxShadow='sm'
                wordBreak='break-word'
                position="relative"
              >
                <Text fontSize="md">{m.content}</Text>
                
                <Text fontSize="9px" textAlign="right" color="gray.500" mt={1}>
                  12:00 PM
                </Text>
              </Box>
            </VStack>
          </Flex>
        );
      })}
    </ScrollableFeed>
  )
}

export default ScrollableChat;