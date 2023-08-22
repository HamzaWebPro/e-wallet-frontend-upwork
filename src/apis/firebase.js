import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { autentificarUser, createEmailUser, getUserEmailData, singInGoogleUser } from "./request";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.useDeviceLanguage();
const googleIn = new GoogleAuthProvider();
const FaceIn = new FacebookAuthProvider();
const twitterIn = new TwitterAuthProvider();

export const SingInGoogle = () => {
  return new Promise((res, rej) => {
    signInWithPopup(auth, googleIn)
      .then(async (result) => {
        const credential = await GoogleAuthProvider.credentialFromResult(result);
        // console.log(credential)
        const token = await credential.idToken;
        const user = await result.user;
        const objectRequest = await { token: token };

        // console.log(user);

        // console.log(result);

        const userInfo = {
          uname: user.displayName,
          firstName: result._tokenResponse.firstName,
          lastName: result._tokenResponse.lastName,
          email: user.email,
          emailVerified: user.emailVerified,
          photoUrl: user.reloadUserInfo.photoUrl,
        };

        let userData = JSON.stringify({
          ...userInfo,
        });
        localStorage.setItem("walletUser", userData);
        res(userInfo);

        // autentificarUser(objectRequest)
        //   .then((data) => {
        //     res(data);
        //   })
        //   .catch((error) => {
        //     rej(error);
        //   });
      })
      .catch((error) => {
        rej(error);
      });
  });

  // return signInWithPopup(auth, googleIn)
  //   .then(async (result) => {
  //     const credential = await GoogleAuthProvider.credentialFromResult(result);
  //     // console.log(credential)
  //     const token = await credential.idToken;
  //     const user = await result.user;
  //     const objectRequest = await { token: token };

  //     const userInfo = {
  //       uname: user.displayName,
  //       email: user.email,
  //       emailVerified: user.emailVerified,
  //       photoUrl: user.reloadUserInfo.photoUrl,
  //     }

  //     // console.log("userinfo",user);
  //     console.log("userinfo", userInfo);

  //     // return userInfo;
  //     // console.log(token);

  //     // autentificarUser(objectRequest)  email, emailVerified, reloadUserInfo.photoUrl
  //     //   .then((data) => {
  //     //     console.log("firebase", data);
  //     //     return data
  //     //   })
  //     //   .catch((error) => {
  //     //     return error
  //     //   });
  //   })
  //   .catch((error) => {
  //     // return error
  //   });
};

export const SingInGoogle2 = () => {
  return new Promise(async (res, rej) => {
    signInWithPopup(auth, googleIn)
      .then(async (result) => {
        const credential = await GoogleAuthProvider.credentialFromResult(result);
        const token = await credential.idToken;
        const user = await result.user;
        const objectRequest = await { token: token };

        // console.log("token",token);
        // console.log("result",result);
        // console.log("credential",credential);

        // singInGoogleUser(token)
        //   .then((data) => {
        //     console.log(data);
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });

        const userInfo = {
          uname: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          photoUrl: user.reloadUserInfo.photoUrl,
        };
        res(userInfo);
      })
      .catch((error) => {
        console.log(error);
        rej(error);
      });
  });
};

export const SingInFace = () => {
  return new Promise((res, rej) => {
    signInWithPopup(auth, FaceIn)
      .then(async (result) => {
        const credential = await FacebookAuthProvider.credentialFromResult(result);
        const token = credential.accesToken;
        const user = await result.user;
        console.log(user);
        res(user);
      })
      .catch((error) => {
        rej(error);
      });
  });
};

export const SingUp = (email, password, name, lastName, phone, country) => {
  return new Promise((res, rej) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = await userCredential.user;
        console.log(user);
        const user2 = {
          email: email,
          name: name,
          lastName: lastName,
          password: password,
          id: user.uid,
          phone: phone,
          currency: "usd",
          country: country,
        };

        createEmailUser(user2)
          .then((response) => response.json())
          .then((data) => res(data))
          .catch((error) => console.log(error));

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
        rej(error);
        //..
      });
  });
};

export function SingInPass(email, password) {
  return new Promise((res, rej) => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      const data = { id: user.uid };
      getUserEmailData(data)
        .then((response) => response.json())
        .then((data) => res(data))
        .catch((error) => console.log(error));
    });
  });
}

export const SingInTwitter = () => {
  signInWithPopup(auth, twitterIn).then(async (result) => {
    const credential = await TwitterAuthProvider.credentialFromResult(result);
    const token = credential.accesToken;
    const user = await result.user;
    console.log(user);
    console.log(token);
  });
};
/*
window.recaptchaVerifier = new RecaptchaVerifier('sendSMS', {
  'size': 'invisible',
  'callback': (response) => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    onSignInSubmit();
  }
}, auth);

const appVerifer = window.recaptchaVerifier*/

export function SMS(phone) {
  return new Promise((res, rej) => {
    const element = document.getElementById("sendSMS");
    let recaptchaVerifier;
    if (!element.hasChildNodes()) {
      recaptchaVerifier = new RecaptchaVerifier(
        "sendSMS",
        {
          size: "invisible",
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            //onSignInSubmit();
          },
        },
        auth
      );
    }
    const cellPhone = "+" + phone;
    signInWithPhoneNumber(auth, cellPhone, recaptchaVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        res(confirmationResult);
      })
      .catch((error) => {
        console.log(error);
        rej(error);
      });
  });
}

export function confirmCode(confirmationResult, code) {
  return new Promise((res, rej) => {
    confirmationResult
      .confirm(code)
      .then((result) => {
        const user = result.user;
        res(user);
      })
      .catch((error) => {
        console.log(error);
        rej(error);
      });
  });
}
