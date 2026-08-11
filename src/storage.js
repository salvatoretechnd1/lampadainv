import { db, auth } from './firebase';
import { doc, getDoc, setDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';

// Escolhe a "gaveta" certa: dados compartilhados (visíveis pra todo o grupo)
// ou dados privados (só do usuário atual — ex: o nome salvo no aparelho dele).
function colecao(shared) {
  if (shared) return 'compartilhado';
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error('Usuário ainda não autenticado');
  return `privado_${uid}`;
}

// Mesma "forma" da API window.storage que o app já usa (get/set/delete/list),
// então o restante do código (App.jsx) não precisa mudar nada.
export const storage = {
  async get(key, shared = false) {
    const ref = doc(db, colecao(shared), key);
    const snap = await getDoc(ref);
    if (!snap.exists()) throw new Error(`chave "${key}" não encontrada`);
    return { key, value: snap.data().value, shared };
  },

  async set(key, value, shared = false) {
    const ref = doc(db, colecao(shared), key);
    await setDoc(ref, { value, atualizadoEm: Date.now() });
    return { key, value, shared };
  },

  async delete(key, shared = false) {
    const ref = doc(db, colecao(shared), key);
    await deleteDoc(ref);
    return { key, deleted: true, shared };
  },

  async list(prefix = '', shared = false) {
    const snap = await getDocs(collection(db, colecao(shared)));
    const keys = snap.docs.map((d) => d.id).filter((k) => k.startsWith(prefix));
    return { keys, prefix, shared };
  },
};

// ATENÇÃO — limite do Firestore: cada documento aguenta até ~1MB.
// As fotos (redimensionadas pelo app) ficam bem pequenas e não são problema.
// Já uma gravação de áudio de até 2 minutos pode passar de 1MB dependendo do
// aparelho e da qualidade do microfone. Se algum áudio falhar ao salvar, o
// passo seguinte é mover as gravações para o Firebase Storage (feito pra
// arquivos grandes) em vez do Firestore. Posso te ajudar com isso se algum
// áudio não estiver salvando.
