import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
const stripePromise = loadStripe("pk_test_51R6T6ZAuCKRIANndsN0ARAa6e3hjjD2ahPXCBTRlluHAvxjRhri0jziSnhV1MVkeKetXYzdoyijYpoIPjo1DPdKS00BZZrESLv");

const CheckoutForm = ({ price,service, onClose, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
const redux=useSelector(state=>state.auth.user)
  const neww = {
    email:"am0070563@gmail.com"
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {

      const response = await fetch('https://react-angular-backend-2.onrender.com/api/payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: price, currency: 'usd',service:service,email:redux.email }),
      });

      if (!response.ok) throw new Error('Failed to create payment intent');
      const { clientSecret,invoiceUrl } = await response.json();
      
      console.log('Invoice URL:',await invoiceUrl);
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
console.log(await result)
      if (result.error) {
        alert(result.error.message);
      } else {

        const sendpayment=await axios.post("https://react-angular-backend-2.onrender.com/api/payment",{email:redux.email,amount:result?.paymentIntent?.amount,Paymentstatus:invoiceUrl,service:service});
        console.log(await sendpayment)

        alert('Payment Successful!');
        
navigate(0);


        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error('Payment Error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement  style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '8px' }} />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay $' + price}
      </button>
      <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>Cancel</button>
    </form>
  );
};

const PaymentPopup = ({ price,service, onClose, onSuccess }) => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <div style={{
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '12px',
      width: '400px'
    }}>
      <h2>Complete Your Payment</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm service={service} price={price} onClose={onClose} onSuccess={onSuccess} />
      </Elements>
    </div>
  </div>
);


function Subservice() {
    const data = useSelector(state => state.auth.user);
const [allpayments,setallpayments]=useState([]);
const api=async ()=>{

    const allpayment=await axios.get(`https://react-angular-backend-2.onrender.com/api/getpayment/${data.email}`)
    console.log(await allpayment)
    return allpayment.data.users
    }
    useEffect(() => {
        api().then((response) => {
          if (Array.isArray(response)) {
            const sortedPayments = response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setallpayments(sortedPayments);
          } else {
            setallpayments([]);
          }
        });
      }, []);
      

    const services = [
      { id: 1, name: 'Electricity', price: 100 },
      { id: 2, name: 'Plumber', price: 200 },
      { id: 3, name: 'Internet', price: 300 },
      { id: 4, name: 'Electronics', price: 400 },
    ];
  
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [completedPayments, setCompletedPayments] = useState([]);
  const [ser,setser]=useState(null);
   
    useEffect(() => {
      const history = JSON.parse(localStorage.getItem('payments')) || [];
      setCompletedPayments(history);
    }, []);
  
    const handleSuccess = () => {
      const service = services.find(s => s.price === selectedPrice);
  
      const paymentDetails = {
        price: selectedPrice,
        service: service?.name || 'Unknown Service',
        email: data?.email,
        time: new Date().toLocaleString(),
        status: 'Completed',
      };
  
      const updatedPayments = [...completedPayments, paymentDetails];
      setCompletedPayments(updatedPayments);
      localStorage.setItem('payments', JSON.stringify(updatedPayments));
      setSelectedPrice(null);
    };
  
    return (
      <div style={{ width: '82vw', padding: '16px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Our Services</h1>
  
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          {services.map((service) => (
            <div key={service.id} style={{
              backgroundColor: completedPayments.some(payment => payment.price === service.price && payment.email === data?.email) ? '#d1e7dd' : 'white',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              borderRadius: '12px',
              padding: '24px',
              cursor: 'pointer'
            }}>
              <span style={{ fontSize: '18px', fontWeight: '600' }}>{service.name}</span>
              <button style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                marginLeft: '10px'
              }} onClick={() => {setSelectedPrice(service.price);
                setser(service.name);
              }}>
                ${service.price}
              </button>
            </div>
          ))}
        </div>
  
        {selectedPrice && <PaymentPopup service={ser} price={selectedPrice} onClose={() => setSelectedPrice(null)} onSuccess={handleSuccess} />}
  
        {completedPayments.length > 0 && (
  <div style={{ marginTop: '24px' }}>
    <h2>Payment History</h2>

   
    <div style={{
      width: '100%',
      overflowX: 'auto',
      maxHeight: '400px',
      border: '1px solid #ccc',
      borderRadius: '8px'
    }}>
      
      <div style={{ display: 'flex', backgroundColor: '#007bff', color: '#fff', padding: '12px 0' }}>
        <div style={{ flex: 1, padding: '12px', fontWeight: 'bold' }}>Email</div>
        <div style={{ flex: 1, padding: '12px', fontWeight: 'bold' }}>Amount</div>
        <div style={{ flex: 1, padding: '12px', fontWeight: 'bold' }}>Service</div>
        <div style={{ flex: 1, padding: '12px', fontWeight: 'bold' }}>Time</div>
        <div style={{ flex: 1, padding: '12px', fontWeight: 'bold' }}>Status</div>
      </div>

     
      {allpayments?.map((payment, index) => (
        <div 
          key={index} 
          style={{ 
            display: 'flex', 
            backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#e6f7ff',
            padding: '12px 0'
          }}
        >
          <div style={{ flex: 1, padding: '12px' }}>{payment.email}</div>
          <div style={{ flex: 1, padding: '12px' }}>${payment.amount}</div>
          <div style={{ flex: 1, padding: '12px' }}>{payment.service}</div>
          <div style={{ flex: 1, padding: '12px' }}>{payment.createdAt}</div>
          <div  
            style={{ 
              flex: 1, 
              padding: '1px',
              color: payment.Paymentstatus === 'succeeded' ? 'green' : 'red' 
            }}
          >
           <button onClick={()=>{window.open(`${payment.Paymentstatus}`, '_blank');
}} style={{borderColor:"GrayText"}}> Downlaod Invoice</button>
          </div>
        </div>
      ))}
    </div>
  </div>
)}

      </div>
    );
  }
  
  export default Subservice;