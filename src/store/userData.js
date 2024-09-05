import { doc, getDoc, setDoc } from "firebase/firestore";
import { app } from "../service/config";
import { getFirestore } from "firebase/firestore";
import { selectCartItems } from "../store/cart"; // Action to set cart in Redux

const db = getFirestore(app);

// Load user's cart on login
export const loadUserCart = async (userId) => {
  const cartRef = doc(db, "carts", userId);
  const cartSnap = await getDoc(cartRef);

  if (cartSnap.exists()) {
    const cartData = cartSnap.data();
    return cartData.items || [];
  } else {
    // If no cart exists, return an empty array
    return [];
  }
};

// Save cart to Firestore when user adds/removes items
export const saveUserCart = async (userId, cartItems) => {
  const cartRef = doc(db, "carts", userId);
  await setDoc(cartRef, { items: cartItems }, { merge: true });
};

// In Redux action
export const syncCartWithFirebase = (userId) => async (dispatch, getState) => {
  const cartItems = getState().cart.items; // Get items from Redux store
  await saveUserCart(userId, cartItems);
  dispatch(selectCartItems(cartItems));
};

