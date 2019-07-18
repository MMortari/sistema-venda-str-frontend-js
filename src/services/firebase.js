import { firebaseDatabase as db } from '../config/firebase';

export default class firebaseService {

  static async getProdutos() {
    db.ref('produtos').child()
      .then(snapshot => {
        console.log("snapshot -> ", snapshot.val());

        snapshot.forEach(data => {
          console.log("produto -> ", data.val())
        })
      });
  }

}