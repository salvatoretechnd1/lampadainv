import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';

// 1. Vá em https://console.firebase.google.com, crie um projeto (gratuito).
// 2. Dentro do projeto: Build > Firestore Database > Criar banco (modo produção).
// 3. Build > Authentication > Sign-in method > ative "Anônimo".
// 4. Configurações do projeto (ícone de engrenagem) > Geral > "Seus apps" > Web (</>)
//    copie o objeto de configuração e cole abaixo, no lugar dos valores de exemplo.
//
// ================================================================
//   COLE SUAS CHAVES REAIS AQUI EMBAIXO, NO LUGAR DOS VALORES
//   'SUA_API_KEY', 'SEU_PROJETO', etc.
// ================================================================
const firebaseConfig = {
  apiKey: 'AIzaSyA9RHN1wPUg_9ZT6MQZLP2EO2Aq1xXxdEk',
  authDomain: 'lampada-7d7d9.firebaseapp.com',
  projectId: 'lampada-7d7d9',
  storageBucket: 'lampada-7d7d9.firebasestorage.app',
  messagingSenderId: '747679274860',
  appId: '1:747679274860:web:42e8c5182ce94183bc0549',
};
// ================================================================
//   FIM DA ÁREA PRA COLAR — não precisa mexer em mais nada abaixo
// ================================================================

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Garante que sempre exista um usuário (anônimo) antes do app renderizar.
// É esse usuário que separa os dados "privados" (ex: seu nome salvo) de cada pessoa.
export function aguardarAutenticacao() {
  return new Promise((resolve, reject) => {
    const cancelar = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          cancelar();
          resolve(user);
        } else {
          signInAnonymously(auth).catch(reject);
        }
      },
      reject
    );
  });
}
