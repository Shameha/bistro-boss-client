// import React from 'react';

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import useCart from "../../../hook/useCart";
import useAuth from "../../../hook/useAuth";

const CheckoutForm = () => {
const [error,setError] = useState('');
const [clientSecret,setClientSecret] = useState('');
const [transactionId,setTransactionId] = useState('');
const stripe = useStripe();
const{user} = useAuth();
// console.log(stripe);
const elements = useElements();
// console.log(elements);
const asiosSecure = useAxiosSecure();
const [cart] = useCart();
const totalPrice = cart.reduce((total,item)=> total + item.price,0)


useEffect(() =>{
if(totalPrice >0){
    asiosSecure.post('/create-payment-intent',{price: totalPrice})
    .then( res =>{
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret)
    })
}

},[asiosSecure, totalPrice])

    const handleSubmit = async(event) =>{
        event.preventDefault();
        if (!stripe || !elements) {
            return
        }
        // console.log('hello');
        const card = elements.getElement(CardElement)
        if(card === null){
            return
        }
        const {error,paymentMethod} = await stripe.createPaymentMethod({
            type:'card',
            card
        })
        if(error){
            console.log('payment error',error);
            setError(error.message)
        }
        else{
            console.log('payment method',paymentMethod);
            // console.log('hello');
            setError('')
        }

        //confirm payment
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret,{
            payment_method:{
                card : card,
                billing_details:{
               email: user?.email || 'anonymus',
               name: user?.displayNmae || 'anonymus'
                }
            }
        })
        if(confirmError){
            console.log('confirm error');
        }
        else{
            console.log('payment intent',paymentIntent);
            if(paymentIntent.status === 'succeeded'){
                console.log('trasction id ',paymentIntent.id);
                setTransactionId(paymentIntent.id)
                //now save the payment to the database
                const payment ={
                    email: user.email,
                    price :totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(), //moment js
                    cartIds : cart.map(item => item._id),
                    menuIds : cart.map(item => item.menuId),
                    status: 'pending'
                }
              const res =await asiosSecure.post('/payments',payment);
            console.log('payment saved',res.data);
                
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} >
            <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button className="btn btn-sm btn-primary my-4" disabled={!stripe ||!clientSecret} type="submit">
        Pay
      </button>
      <p className="text-red-600">{error}</p>
      {transactionId && <p className="text-green-600">{transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;