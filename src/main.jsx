import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { aguardarAutenticacao } from './firebase';
import { storage } from './storage';

// O App.jsx original foi escrito pra usar "window.storage" (a API de
// armazenamento do ambiente do Claude). Aqui a gente só "pluga" a versão
// real, ligada ao Firebase, no mesmo lugar — o resto do app não muda.
window.storage = storage;

aguardarAutenticacao()
  .then(() => {
    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  })
  .catch((erro) => {
    document.getElementById('root').innerHTML =
      '<p style="font-family:sans-serif;padding:24px;color:#c1666b">Não foi possível conectar ao Firebase. Confira as chaves em src/firebase.js.</p>';
    console.error(erro);
  });
