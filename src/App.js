import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { mainActions } from "./store/main-slice";
import StatusBarMessage from "./components/UI/StatusBarMessage";
import { cartActions } from "./store/cart-slice";

let isInitialRunningPut = true;

function App() {
    const dispatch = useDispatch();
    const isCartVisible = useSelector((state) => state.main.isCartVisible);
    const cart = useSelector((state) => state.cart);
    const statusMessage = useSelector((state) => state.main.statusMessage);

    useEffect(() => {
        const sendCartData = async () => {
            if (cart.isCartContentChange) {
                dispatch(
                    mainActions.showStatusMessage({
                        status: "pending",
                        title: "Отправка Данных",
                        message: "Данные корзини отправляються на сервер...",
                    })
                );
            }

            const response = await fetch(
                "https://react-projects-ff9d4-default-rtdb.firebaseio.com/cart.json",
                {
                    method: "PUT",
                    body: JSON.stringify(cart),
                }
            );
            if (!response.ok) {
                throw new Error("Ошибка при отправки данных корзини");
            }

            if (cart.isCartContentChange) {
                dispatch(
                    mainActions.showStatusMessage({
                        status: "success",
                        title: "Отправка Данных Успешна",
                        message: "Данные корзини успешно отправлени на сервер!",
                    })
                );
            }
        };
        if (isInitialRunningPut) {
            isInitialRunningPut = false;
            return;
        }
        sendCartData().catch((e) => {
            dispatch(
                mainActions.showStatusMessage({
                    status: "error",
                    title: "Ошибка Запроса",
                    message: "Ошибка при отправке данних корзини на сервер!",
                })
            );
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart]);

    useEffect(() => {
        const getCartData = async () => {
            const response = await fetch(
                "https://react-projects-ff9d4-default-rtdb.firebaseio.com/cart.json"
            );
            if (!response.ok) {
                throw new Error("Невозможно извлечь данные");
            }
            const data = await response.json();

            dispatch(
                cartActions.upDataCart({
                    items: data.items || [],
                    itemsQuantity: data.itemsQuantity,
                })
            );
        };

        getCartData().catch((e) => {
            dispatch(
                mainActions.showStatusMessage({
                    status: "error",
                    title: "Ошибка Запроса",
                    message: "Ошибка при получении данных корзины!",
                })
            );
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Fragment>
            {statusMessage && (
                <StatusBarMessage
                    status={statusMessage.status}
                    title={statusMessage.title}
                    message={statusMessage.message}
                />
            )}
            <Layout>
                {isCartVisible && <Cart />}
                <Products />
            </Layout>
        </Fragment>
    );
}

export default App;
