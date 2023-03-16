import { useSelector, useDispatch } from "react-redux";
import Card from "../UI/Card";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import { mainActions } from "../../store/main-slice";

const Cart = (props) => {
    const dispatch = useDispatch();
    const cartItem = useSelector((state) => state.cart.items);
    const closeHandler = () => {
        dispatch(mainActions.toggleCartVisibility());
    };

    return (
        <Card className={styles.cart}>
            <h2>Мои Покупки</h2>
            <span
                className={styles.close}
                onClick={closeHandler}
            >
                &times;
            </span>
            <ul>
                {cartItem.map((item) => (
                    <CartItem
                        key={item.id}
                        item={{
                            id: item.id,
                            title: item.title,
                            quantity: item.quantity,
                            total: item.totalPrice,
                            price: item.price,
                        }}
                    />
                ))}
            </ul>
        </Card>
    );
};

export default Cart;
