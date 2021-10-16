import { initializeApp, getApps } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyDkiaflH_rt6IvlgZABFCVJCXVBRC9mtvQ",
  authDomain: "paog-f4ed1.firebaseapp.com",
  projectId: "paog-f4ed1",
  storageBucket: "paog-f4ed1.appspot.com",
  messagingSenderId: "979274666379",
  appId: "1:979274666379:web:770391b20cc9d708235f8e",
  measurementId: "G-653X2H3WVZ"
}

const app = initializeApp(firebaseConfig) 

export default app