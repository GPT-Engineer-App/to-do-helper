import { useState } from "react";
import { Box, Input, Button, List, ListItem, ListIcon, IconButton, Heading, VStack, HStack, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const toast = useToast();

  const handleAddTodo = () => {
    if (input.trim() === "") {
      toast({
        title: "No content",
        description: "You can't add an empty todo.",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTodos([...todos, input]);
    setInput("");
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <VStack p={8}>
      <Heading mb={6}>Todo App</Heading>
      <HStack>
        <Input placeholder="Add your new todo" value={input} onChange={handleInputChange} onKeyPress={handleKeyPress} />
        <Button onClick={handleAddTodo} colorScheme="blue" px={8}>
          Add <ListIcon as={FaPlus} />
        </Button>
      </HStack>
      <List spacing={3} mt={6} w="100%">
        {todos.map((todo, index) => (
          <ListItem key={index} p={2} bg="gray.100" borderRadius="md" display="flex" justifyContent="space-between" alignItems="center">
            {todo}
            <IconButton icon={<FaTrash />} isRound="true" onClick={() => handleDeleteTodo(index)} aria-label="Delete todo" />
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

export default Index;
