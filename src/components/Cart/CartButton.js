import { useDispatch, useSelector } from "react-redux";
import { mainActions } from "../../store/main-slice";
import styles from "./CartButton.module.css";

const CartButton = (props) => {
    const quantity = useSelector((state) => state.cart.itemsQuantity);
    const dispatch = useDispatch();
    const isCartVisibility = () => {
        dispatch(mainActions.toggleCartVisibility());
    };
    return (
        <button
            className={styles.button}
            onClick={isCartVisibility}
        >
            <span>Корзина</span>
            <span className={styles.badge}>{quantity}</span>
        </button>
    );
};

export default CartButton;
