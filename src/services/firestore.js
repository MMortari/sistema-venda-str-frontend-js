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
        .then((data) => resolve({ status: true, data: { id: data.id } }))
        .catch((err) => reject({ status: false, data: err }));
    });
  }
  static async updateProdutos(produto) { 
    return await new Promise((resolve, reject) => {
      db.collection('produtos').doc(produto.id).set(produto)
        .then((data) => resolve({ status: true, data: { id: data.id } }))
        .catch((err) => reject({ status: false, data: err }));
    });
  }
  static async deleteProdutos(id) {
    return await new Promise((resolve, reject) => {
      db.collection('produtos').doc(`${id}`).delete()
        .then((data) => resolve({ status: true, data: { id: data.id } }))
        .catch((err) => reject({ status: false, data: err }))
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
        .catch((err) => reject({ status: false, data: err }));
    })
  }
  static async createVendas(venda) { 
    return await new Promise((resolve, reject) => {
      db.collection('vendas').add(venda)
        .then(data => resolve({ status: true, data: { id: data.id } }))
        .catch((err) => reject({ status: false, data: err }));
    });
  }
  static async updateVendas(produto) { 
    return await new Promise((resolve, reject) => {
      db.collection('vendas').doc(produto.id).set(produto)
        .then(data => resolve({ status: true, data: { id: data.id } }))
        .catch((err) => reject({ status: false, data: err }));
    });
  }
  static async deleteVendas(id) {
    return await new Promise((resolve, reject) => {
      db.collection('vendas').doc(`${id}`).delete()
        .then((data) => resolve({ status: true, data: { id: data.id } }))
        .catch((err) => reject({ status: false, data: err }))
    });
  }

  static async getComandas() {
    return await new Promise((resolve, reject) => {
      db.collection('comandas').get()
        .then((snapshot) => {
          let comandas = [];
          snapshot.forEach((doc) => {
            comandas.push({ ...doc.data(), id: doc.id  })
          });
          resolve(comandas);
        })
        .catch((err) => reject({ status: false, data: err }));
    })
  }
  static async createComandas(data) { 
    return await new Promise((resolve, reject) => {
      db.collection('comandas').add(data)
        .then((data) => resolve({ status: true, data: { id: data.id } }))
        .catch((err) => reject({ status: false, data: err }));
    });
  }
  static async updateComandas(produto) { 
    return await new Promise((resolve, reject) => {
      db.collection('comandas').doc(produto.id).update(produto)
        .then((data) => resolve({ status: true, data: { id: data.id } }))
        .catch((err) => reject({ status: false, data: err }));
    });
  }
  static async deleteComandas(id) {
    return await new Promise((resolve, reject) => {
      db.collection('comandas').doc(`${id}`).delete()
        .then((data) => resolve({ status: true, data: { id: data.id } }))
        .catch((err) => reject({ status: false, data: err }))
    });
  }

}

// Principal -> https://cloud.google.com/firestore/docs/how-to

// Adicionar -> https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=1
// Apagar -> https://firebase.google.com/docs/firestore/manage-data/delete-data?authuser=1

//https://firebase.googleblog.com/2016/07/5-tips-for-firebase-storage.html