import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import gooleImage from '../image/google.png'
import { url } from "../url";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch(`${url}/api/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="outline flex  justify-center text-gray-900 font-semibold p-3 rounded-lg uppercase hover:opacity-95"
    >
      Continue with google
      <img
      src={gooleImage}
        // src="https://firebasestorage.googleapis.com/v0/b/fares-estate.appspot.com/o/1711038927889google.png?alt=media&token=1091b1ae-e72d-4211-8510-e5d1a2c34be4"
        className="w-5 ml-3"
      />
    </button>
  );
}
