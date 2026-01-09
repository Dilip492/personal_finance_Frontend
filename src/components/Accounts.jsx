import React, { useState } from 'react'
import API_ENDPOINTS from '../config/apiConfig'
import Carddisplay from './Card/Carddisplay';
import Cardform from './Card/Cardform';




const Accounts = () => {

  const [amount, setamount] = useState({ "amount": " " });
  const [loading, setloading] = useState(null)
  const [error, setError] = useState(null);




  const handlechange = (e) => {

    setamount({ amount: e.target.value })

  }

  const handlepayment = async () => {
    setloading(true)
    setamount({ amount: "" });
    try {

      const response = await fetch(API_ENDPOINTS.PAYMENT, {
        headers: { 'Content-Type': 'application/json' },
        method: "POST",
        body: JSON.stringify(amount)
      })
      const res = await response.json();

      console.log(res.order.id)

      const options = {
        "key": res.key, // Enter the Key ID generated from the Dashboard
        "amount": res.order.id, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "FinancePro", //your business name
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": res.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "callback_url": "http://localhost:8000/api3/paymentVerification",
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
          "name": "Dilip", //your customer's name
          "email": "dpal991193@gmail.com",
          "contact": "9717203092" //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
          "address": "Razorpay Corporate Office"
        },
        "theme": {
          "color": "#3399cc"
        }, handler: function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

          fetch("http://localhost:8000/api3/paymentVerification", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            })
          }).then((res) => res.json()).then((data) => {
            if (data.success) {
              // window.location.href = data.Url;
              console.log(data.Url)
            } else {
              // window.location.href = "/dashboard"
            }
          })
        }
      };
      // const rzp1 = new Razorpay(options);
      const razor = new window.Razorpay(options);
      razor.open();


    } catch (error) {

      setError(error.message)

    } finally {
      setloading(false)
    }

  }


  return (
    <div>
      {
        error && alert(error)
      }
      <div className='h-[80vh] w-[80wh] ml-60'>

        {
          loading ? (
            <p>loading...</p>
          ) : (

            <div>

              <h1>This is account sections</h1>

              <div>
                <input value={amount.amount} onChange={handlechange} type="number" placeholder='Enter the amount' />

                <button onClick={handlepayment} className='px-4 py-1 m-2 border'>Pay</button>
              </div>
            </div>
          )
        }

        <div className='m-2'>

            <Carddisplay />

            {/* <Cardform/> */}
        </div>
    
       

      </div>






    </div>
  )
}

export default Accounts
