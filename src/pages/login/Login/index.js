import React, { Component } from 'react';
import { Form as Unform, Input } from '@rocketseat/unform';

// Service
import { app } from './../../../config/firebase';
// Style
import './style.scss';

export default class Login extends Component {

  componentDidMount() {

  }

  async submitLoginBanana({ email, senha }){
    const sign = await app.auth().signInWithEmailAndPassword(email, senha);
  }

  render () {
    return (
      <div className="login">
        <div className="card-login text-center">
          <h1>Login</h1>
          <Unform onSubmit={this.submitLoginBanana}>
            <div className="row">
              <div className="col-12">
                <Input className="form-control text-center" type="email" name="email" placeholder="Email" required />
              </div>
              <div className="col-12">
                <Input className="form-control text-center" type="password" name="senha" placeholder="Senha" required />
              </div>
              <div className="col-12">
                <button className="btn btn-dark" type="submit">Entrar</button>
              </div>
            </div>
          </Unform>
        </div>
      </div>
    )
  }

}