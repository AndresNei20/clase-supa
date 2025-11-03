import { useNavigate } from "react-router"
import { supabase } from "../services/supabaseClient"
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { setCart, setProducts } from "../redux/slices/productsSlice";
import { useEffect } from "react";
import type { Product } from "../types/Product";

export const Home = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const session = useSelector((state: RootState) => state.auth.session);
    const user = session?.user;

    const products = useSelector((state: RootState) => state.products.products);

    useEffect(() => {
        const loadProducts = async () => {
            const { data, error } = await supabase
                .from("products")
                .select("id, name, price")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error loading products:", error.message);
                return;
            }

            dispatch(setProducts(data));
        };
        loadProducts();
    }, [dispatch]);

    const handleAddToCart = async(product: Product) => {
        if(!user?.id){
            console.log("User not logged in");
            navigate("/login")
            return 
        }

        dispatch(setCart(product))

        const { error } = await supabase
        .from("cart_items")
        .insert({
            user_id: user.id,
            product_id: product.id,
            quantity: 1
        }) 
        console.log("Added to cart:", product);

        if(error){
            console.error("Error adding to cart:", error.message);
        }
    }

    const handleCloseSession = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.log("error signing out", error)
            return
        }
        navigate("/login")
    }

    const handleGoToCart = () => navigate("/cart")

    return (
        <>
            <h1>Aca estan los productos </h1>
            <button onClick={handleCloseSession}>Sign Out</button>
            <button onClick={handleGoToCart}>Go to cart</button>


            {products.map((product) => (
                <div key={product.id} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 8 }}>
                    <div>{product.name}</div>
                    <div>${product.price}</div>
                    <button onClick={() => handleAddToCart(product)}>Añadir al carrito</button>
                </div>
            ))}
        </>
    )
}