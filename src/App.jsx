import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useCollectionData } from 'react-firebase-hooks/firestore';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyBlq00uvW93kFdN8ye63C3b-6CSrkFWDSM',
    authDomain: 'poc-chat-tradersclub.firebaseapp.com',
    databaseURL: 'https://poc-chat-tradersclub-default-rtdb.firebaseio.com',
    projectId: 'poc-chat-tradersclub',
    storageBucket: 'poc-chat-tradersclub.appspot.com',
    messagingSenderId: '892511281555',
    appId: '1:892511281555:web:5d77b09b9ed12715b38866'
  });
}

const firestore = firebase.firestore();

function App() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(100);
  const [formValue, setFormValue] = useState('');

  const [messages] = useCollectionData(query, { idField: 'id' })

  const sendMessage = async(e) => {
    e.preventDefault();

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    setFormValue('');
  }

  console.log(messages);

  return (
    <>
      <main style={{ display: 'flex', justifyContent: 'center',  margin: 'auto', width: '100%' }}>
        <form onSubmit={sendMessage}>
          <p>
            <strong style={{ marginTop: '2px' }}>Mensagens enviadas:</strong>
          </p>
          <div style={{ border: '2px solid #000', marginBottom: '10px', padding: '8px' }}>
            <div>
              {messages && messages.map((msg) => <p style={{ borderBottom: '#000 1px solid', paddingBottom: '6px' }} key={msg.id}>{msg.text} - {new Date(msg.createdAt.seconds*1000).toLocaleDateString()}</p>)}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginTop: '2px' }}>
              <strong>Insira uma mensagem:</strong>
            </label>
            <textarea style={{ marginTop: '8px' }} onChange={(e) => setFormValue(e.target.value)} />
            <button style={{ marginTop: '8px' }} type="submit">Enviar mensagem</button>
          </div>
        </form>
      </main>
    </>
  );
}

export default App