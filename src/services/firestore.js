import { firebaseFirestore as db } from '../config/firebase';
import _ from 'lodash';

export default class firestoreService {

  static async getCategorias() {
    return await new Promise((resolve, reject) => {
      let categorias = [];
      db.collection('categorias').get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            categorias.push({ ...doc.data(), id: doc.id })
          });
          resolve(categorias);
        })
        .catch(err => reject(err));
    })
  }

  /**
   * @param { string[] } categorias 
   * @returns { Promise } 
   */
  static async getProdutos(categorias = this.getCategorias()) {
    return await new Promise((resolve, reject) => {
      db.collection('produtos').get()
        .then((snapshot) => {
          let produtos = [];
          snapshot.forEach((doc) => {
            produtos.push({ ...doc.data(), id: doc.id, categoriaId: doc.data().categoriaId.id, categoria: _.find(categorias, ["id", doc.data().categoriaId.id])  })
          });
          resolve(produtos)
        })
        .catch(err => reject(err));
    })
  }
  static async createProdutos(data) { 
    return await new Promise((resolve, reject) => {
      db.collection('produtos').add(data)
        .then(() => resolve(true))
        .catch(() => reject(false));
    });
  }
  static async updateProdutos(produto) { 
    return await new Promise((resolve, reject) => {
      db.collection('produtos').doc(produto.id).set(produto)
        .then(data => {
          console.log("update produto -> ", data)
          resolve(true)
        })
        .catch(() => reject(false));
    });
  }
  static async deleteProdutos(id) {
    return await new Promise((resolve, reject) => {
      db.collection('produtos').doc(`${id}`).delete()
        .then(() => resolve(true))
        .catch(() => reject(false))
    });
  }

  static async getVendas() {
    return await new Promise((resolve, reject) => {
      db.collection('vendas').get()
        .then((snapshot) => {
          let vendas = [];
          snapshot.forEach((doc) => {
            vendas.push({ ...doc.data(), id: doc.id  })
          });
          resolve(vendas)
        })
        .catch(err => reject(err));
    })
  }
  static async createVendas(data) { 
    return await new Promise((resolve, reject) => {
      db.collection('vendas').add(data)
        .then(() => resolve(true))
        .catch(() => reject(false));
    });
  }
  static async updateVendas(produto) { 
    return await new Promise((resolve, reject) => {
      db.collection('vendas').doc(produto.id).set(produto)
        .then(data => {
          console.log("update venda -> ", data)
          resolve(true)
        })
        .catch(() => reject(false));
    });
  }
  static async deleteVendas(id) {
    return await new Promise((resolve, reject) => {
      db.collection('vendas').doc(`${id}`).delete()
        .then(() => resolve(true))
        .catch(() => reject(false))
    });
  }

}

// Adicionar -> https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=1
// Apagar -> https://firebase.google.com/docs/firestore/manage-data/delete-data?authuser=1

//https://firebase.googleblog.com/2016/07/5-tips-for-firebase-storage.html