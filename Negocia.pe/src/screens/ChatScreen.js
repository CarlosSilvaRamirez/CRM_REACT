import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChatScreen = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hola, ¿cómo estás?', sender: 'other' },
    { id: '2', text: '¡Hola! Estoy bien, gracias.', sender: 'me' },
    { id: '3', text: 'Que bueno, me alegra', sender: 'other' },
    { id: '4', text: 'Gracias.', sender: 'me' },
    // Agrega más mensajes aquí
  ]);

  const [showContextMenu, setShowContextMenu] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      const newMessage = { id: messages.length + 1, text: inputText, sender: 'me' };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const handleLongPress = message => {
    setSelectedMessage(message);
    setShowContextMenu(true);
  };

  const handleEdit = () => {
    // Implementa la lógica para editar el mensaje aquí
    setShowContextMenu(false);
  };

  const handleDelete = () => {
    // Implementa la lógica para eliminar el mensaje aquí
    setShowContextMenu(false);
  };

  const handleCopy = () => {
    // Implementa la lógica para copiar el mensaje aquí
    setShowContextMenu(false);
  };

  const handleOpenSettings = () => {
    setShowSettingsMenu(true);
  };

  const handleCloseSettings = () => {
    setShowSettingsMenu(false);
  };

  const renderContextMenu = () => {
    if (!selectedMessage) return null;

    return (
      <View style={styles.contextMenu}>
        <TouchableOpacity style={styles.contextMenuItem} onPress={handleEdit}>
          <Text style={styles.contextMenuItemText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contextMenuItem} onPress={handleDelete}>
          <Text style={styles.contextMenuItemText}>Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contextMenuItem} onPress={handleCopy}>
          <Text style={styles.contextMenuItemText}>Copiar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderSettingsMenu = () => {
    if (!showSettingsMenu) return null;

    return (
      <View style={styles.settingsMenu}>
        {/* Agrega aquí las opciones de ajustes generales del chat */}
        <TouchableOpacity style={styles.settingsMenuItem} onPress={handleCloseSettings}>
          <Text style={styles.settingsMenuItemText}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.settingsButton} onPress={handleOpenSettings}>
        <Ionicons name="ellipsis-vertical" size={24} color="black" />
      </TouchableOpacity>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onLongPress={() => handleLongPress(item)}>
            <View
              style={[
                styles.messageContainer,
                item.sender === 'me' ? styles.myMessage : styles.otherMessage,
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
              <Text style={styles.senderName}>{item.sender === 'me' ? 'Tú' : 'Otro Usuario'}</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Modal visible={showContextMenu} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setShowContextMenu(false)}>
          <View style={styles.modalBackground} />
        </TouchableWithoutFeedback>
        {renderContextMenu()}
      </Modal>
      {renderSettingsMenu()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%',
    marginVertical: 5,
    paddingHorizontal: 15,
  },
  myMessage: {
    backgroundColor: '#DCF8C5',
    alignSelf: 'flex-end',
    marginLeft: 50,
  },
  otherMessage: {
    backgroundColor: '#EFEFEF',
    alignSelf: 'flex-start',
    marginRight: 50,
  },
  messageText: {
    fontSize: 16,
  },
  senderName: {
    fontSize: 12,
    marginTop: 3,
    color: '#666666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#E4E4E4',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    borderRadius: 20,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#00BFFF',
    padding: 10,
    borderRadius: 20,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contextMenu: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    elevation: 5,
  },
  contextMenuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
  },
  contextMenuItemText: {
    fontSize: 16,
    color: '#333',
  },
  settingsButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  settingsMenu: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 150,
    backgroundColor: 'white',
    elevation: 5,
  },
  settingsMenuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
  },
  settingsMenuItemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ChatScreen;
