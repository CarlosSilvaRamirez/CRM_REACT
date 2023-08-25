import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Modal, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const ChatsGeneralesScreen = ({ navigation }) => {
  const conversations = [
    { id: '1', user: 'Usuario 1', lastMessage: 'Hola, ¿cómo estás?', lastMessageTime: '10:30 AM' },
    { id: '2', user: 'Usuario 1', lastMessage: 'Hola, ¿cómo estás?', lastMessageTime: '10:30 AM' },
    { id: '3', user: 'Usuario 1', lastMessage: 'Hola, ¿cómo estás?', lastMessageTime: '10:30 AM' },
    { id: '4', user: 'Usuario 1', lastMessage: 'Hola, ¿cómo estás?', lastMessageTime: '10:30 AM' },
    { id: '5', user: 'Usuario 1', lastMessage: 'Hola, ¿cómo estás?', lastMessageTime: '10:30 AM' },
  ];

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };
  
  const [activeTab, setActiveTab] = useState('Todas'); // Estado para controlar la pestaña activa
  const [searchText, setSearchText] = useState('');
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [userOptionsPosition, setUserOptionsPosition] = useState({ x: 0, y: 0 });

  const currentUser = { name: 'Nombre de Usuario' };

  const handleChatPress = (user) => {
    navigation.navigate('ChatScreen', { user });
  };

  const handleOpenOptionsModal = (event) => {
    setShowOptionsModal(true);
    setUserOptionsPosition({ x: event.nativeEvent.pageX, y: event.nativeEvent.pageY });
  };

  const handleCloseOptionsModal = () => {
    setShowOptionsModal(false);
  };

  const handleLongPress = (user, event) => {
    setSelectedUser(user);
    setModalPosition({ x: event.nativeEvent.pageX, y: event.nativeEvent.pageY });
  };

  const handleCloseLongPress = () => {
    setSelectedUser(null);
  };

  return (
<View style={styles.container}>
      <View style={styles.profileHeader}>
        <Ionicons name="person" size={24} color="black" />
        <View style={styles.userStatusContainer}>
          <Text style={styles.userName}>{currentUser.name}</Text>
          <Ionicons
            name="ellipse"
            size={10}
            color="green" // Cambia esto al color que desees
            style={styles.userStatusIcon}
          />
        </View>
        <TouchableOpacity style={styles.settingsButton} onPress={handleOpenOptionsModal}>
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={24} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar usuarios"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'Todas' && styles.activeTab]}
          onPress={() => handleTabPress('Todas')}
        >
          <Text style={styles.tabText}>Todas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'Sin Responder' && styles.activeTab]}
          onPress={() => handleTabPress('Sin Responder')}
        >
          <Text style={styles.tabText}>Sin Responder</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, activeTab === 'Grupos' && styles.activeTab]}
          onPress={() => handleTabPress('Grupos')}
        >
          <Text style={styles.tabText}>Grupos</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.conversationItem}
            onPress={() => handleChatPress(item.user)}
            onLongPress={(event) => handleLongPress(item.user, event)}
            onPressIn={(event) => setShowUserOptions(true)}
            onPressOut={() => setShowUserOptions(false)}
          >
            <Ionicons name="person-circle" size={30} color="black" style={styles.profileIcon} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.user}</Text>
              <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            </View>
            <View style={styles.lastMessageTimeContainer}>
              <Text style={styles.lastMessageTime}>{item.lastMessageTime}</Text>
            </View>
            {showUserOptions && item === selectedUser && (
              <View style={styles.userOptions}>
                <TouchableOpacity
                  style={styles.userOptionItem}
                  onPress={() => console.log('Eliminar chat')}
                >
                  <Text style={styles.userOptionText}>Eliminar chat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.userOptionItem}
                  onPress={() => console.log('Vaciar chat')}
                >
                  <Text style={styles.userOptionText}>Vaciar chat</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        )}
      />
      <Modal visible={showOptionsModal} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={handleCloseOptionsModal}>
          <View style={styles.modalBackground}>
            <View style={[styles.optionsModal, { top: userOptionsPosition.y, left: userOptionsPosition.x }]}>
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => console.log('Crear contacto')}
              >
                <Text style={styles.optionText}>Crear contacto</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionItem}
                onPress={() => console.log('Cambiar áreas de canales')}
              >
                <Text style={styles.optionText}>Cambiar áreas de canales</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {selectedUser && (
        <Modal visible={true} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={handleCloseLongPress}>
            <View style={styles.modalBackground}>
              <View style={[styles.longPressOptionsModal, { top: modalPosition.y, left: modalPosition.x }]}>
                <TouchableOpacity
                  style={styles.longPressOptionItem}
                  onPress={() => console.log('Eliminar chat')}
                >
                  <Text style={styles.longPressOptionText}>Eliminar chat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.longPressOptionItem}
                  onPress={() => console.log('Vaciar chat')}
                >
                  <Text style={styles.longPressOptionText}>Vaciar chat</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchInput: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E4E4E4',
    position: 'relative',
  },
  profileIcon: {
    marginRight: 10,
  },
  settingsButton: {
    // Estilos para el botón de configuración
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionsModal: {
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
    padding: 10,
    position: 'absolute',
  },
  optionItem: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  userOptions: {
    position: 'absolute',
    top: '100%',
    right: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
  },
  userOptionItem: {
    padding: 10,
  },
  userOptionText: {
    fontSize: 16,
    color: '#333',
  },
  longPressOptionsModal: {
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 5,
    padding: 10,
    position: 'absolute',
  },
  longPressOptionItem: {
    paddingVertical: 10,
  },
  longPressOptionText: {
    fontSize: 16,
    color: '#333',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#F4F4F4', // Agregamos un color de fondo al buscador
    marginBottom: 15, // Aumentamos el espacio inferior
  },
  userStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userStatusIcon: {
    marginRight: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingVertical: 10, // Aumentamos el espacio vertical dentro del campo
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#FFA500', // Color de fondo cuando la pestaña está activa
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userInfo: {
    flex: 1,
    marginRight: 10,
  },
  lastMessage: {
    fontSize: 12,
    color: '#999',
  },
  lastMessageTimeContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  lastMessageTime: {
    fontSize: 12,
    color: '#999',
  },
});

export default ChatsGeneralesScreen;
