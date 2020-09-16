import React, { Component, createContext } from "react";
import { auth } from "../firebase";
import { createOrGetUserProfileDocument } from "../firebase";

const initialUserState = { user: null, loading: true };
export const UserContext = createContext(initialUserState);

export default class UserProvider extends Component {
  state = initialUserState;
  componentDidMount = async () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createOrGetUserProfileDocument(userAuth);
        userRef.onSnapshot((snapshot) => {
          this.setState({
            user: { uid: snapshot.id, ...snapshot.data() },
            loading: false,
          });
        });
      }
      this.setState({ user: userAuth, loading: false });
    });
  };
  render() {
    const { user, loading } = this.state;
    const { children } = this.props;
    return (
      <UserContext.Provider value={{ user, loading }}>
        {children}
      </UserContext.Provider>
    );
  }
}
