import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../redux/store";
import { useEffect } from "react";
import { supabase } from "../services/supabaseClient";
import { clearCart, setCart } from "../redux/slices/productsSlice";
import type { Product } from "../types/Product";
import { useNavigate } from "react-router";

export const Cart: React.FC = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const session = useSelector((state: RootState) => state.auth.session);
    const userId = session?.user?.id;
    const cart = useSelector((state: RootState) => state.products.cart); 

    useEffect(() => {
        const loadCart = async() => {
            if(!userId) return;
            console.log("cargando carrito para usuario:", userId);

            const { data, error } = await supabase
            .from("cart_items")
            .select(`
                id, quantity, product: products (id, name, price)`) 
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

            if(error){
                console.error("Error loading cart items:", error.message);
                return;
            }

            dispatch(clearCart());

            (data ?? []).forEach((row: any) => {
                const product: Product = {
                    id: row.product.id,
                    name: row.product.name,
                    price: row.product.price
                }
                dispatch(setCart(product))
            });
        }

        loadCart()
    }, [dispatch, userId])

    console.log("cart" ,cart)

    const handleClearCart = async() => {
        if(!userId) return;

        const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", userId);

        if (error) {
            console.error("Error clearing cart:", error.message);
        } else {
            dispatch(clearCart());
        }
    }

    const BackToHome = () => navigate("/home")

    return (
        <>
        <h1>Your Cart</h1>
        <p>List of items in the cart will go here.</p>
        <button onClick={BackToHome}> Back to home </button>
        <button onClick={handleClearCart}>Clear cart</button>
        {
            cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ): (
                cart.map((product) => (
                    <div key={product.id} style={{ border: "1px solid #ddd", padding: 12, marginBottom: 8 }}>
                        <h3>{product.name}</h3>
                        <p>{product.price}</p>
                    </div>
                ))
            )
        }
        </>
    )
}