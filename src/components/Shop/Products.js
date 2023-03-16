import ProductItem from "./ProductItem";
import styles from "./Products.module.css";

const DUMMY_ITEMS = [
    {
        id: "1",
        price: 7,
        title: "Супер-Товар 1",
        description:
            "Благодаря своему высокому качеству, этот Супер-Товар 1 прослужит вам очень долго.",
    },
    {
        id: "2",
        price: 9,
        title: "Супер-Товар 2",
        description:
            "Благодаря своему высокому качеству, этот Супер-Товар 2 прослужит вам очень долго.",
    },
    {
        id: "3",
        price: 12,
        title: "Супер-Товар 3",
        description:
            "Благодаря своему высокому качеству, этот Супер-Товар 3 прослужит вам очень долго.",
    },
];

const Products = (props) => {
    return (
        <section className={styles.products}>
            <h2>В нашем магазине товары самого высокого качества</h2>
            <ul>
                {DUMMY_ITEMS.map((item) => (
                    <ProductItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        price={item.price}
                        description={item.description}
                    />
                ))}
            </ul>
        </section>
    );
};

export default Products;
