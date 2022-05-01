import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import * as AuthSession from "expo-auth-session";
import * as AppleAuthentication from "expo-apple-authentication";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";

const { GOOGLE_CLIENT_ID } = process.env;
const { GOOGLE_REDRECT_URI } = process.env;

interface AuthProvider {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  signinWithGoogle: () => Promise<void>;
  signinWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthorizationResponse {
  type: string;
  params: {
    access_token: string;
  };
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

function AuthProvider({ children }: AuthProvider) {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsloading] = useState<boolean>(false);

  const userStorageKey = "@gofinances:user";

  useEffect(() => {
    loadUserIfLogged();
  }, []);

  async function loadUserIfLogged() {
    setIsloading(true);
    const userData = await await AsyncStorage.getItem(userStorageKey);
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setIsloading(false);
  }

  async function signinWithGoogle() {
    //https://accounts.google.com/o/oauth2/v2/auth
    try {
      const RESPONSE_TYPE = "token";
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );
        const userInfo = await response.json();

        const userLogged = {
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          photo: userInfo.picture,
        };

        setUser(userLogged);

        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function signinWithApple() {
    try {
      const credentials = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credentials) {
        const userLogged = {
          id: credentials.user,
          email: credentials.email,
          name: credentials.fullName.givenName,
          photo: undefined,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async function signOut() {
    setUser({} as User);
    await await AsyncStorage.removeItem(userStorageKey);
  }

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator color={"#5636D3"} />
    </View>
  ) : (
    <AuthContext.Provider
      value={{
        user,
        signinWithGoogle,
        signinWithApple,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const { user, signinWithGoogle, signinWithApple, signOut } =
    useContext(AuthContext);

  return {
    user,
    signinWithGoogle,
    signinWithApple,
    signOut,
  };
}

export { AuthProvider, useAuth };
