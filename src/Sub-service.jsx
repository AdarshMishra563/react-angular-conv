import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_test_51R6T6ZAuCKRIANndsN0ARAa6e3hjjD2ahPXCBTRlluHAvxjRhri0jziSnhV1MVkeKetXYzdoyijYpoIPjo1DPdKS00BZZrESLv");

const CheckoutForm = ({ price, onClose, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://react-angular-backend-2.onrender.com/api/payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: price, currency: 'usd' }),
      });

      if (!response.ok) throw new Error('Failed to create payment intent');
      const { clientSecret } = await response.json();
      
      
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });
console.log(await result);
      if (result.error) {
        alert(result.error.message);
      } else {
        alert('Payment Successful!');
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
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay $' + price}
      </button>
      <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>Cancel</button>
    </form>
  );
};

const PaymentPopup = ({ price, onClose, onSuccess }) => (
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
        <CheckoutForm price={price} onClose={onClose} onSuccess={onSuccess} />
      </Elements>
    </div>
  </div>
);


function Subservice() {
    const data = useSelector(state => state.auth.user);
    const services = [
      { id: 1, name: 'Electricity', price: 100 },
      { id: 2, name: 'Plumber', price: 200 },
      { id: 3, name: 'Internet', price: 300 },
      { id: 4, name: 'Electronics', price: 400 },
    ];
  
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [completedPayments, setCompletedPayments] = useState([]);
  
   
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
              }} onClick={() => setSelectedPrice(service.price)}>
                ${service.price}
              </button>
            </div>
          ))}
        </div>
  
        {selectedPrice && <PaymentPopup price={selectedPrice} onClose={() => setSelectedPrice(null)} onSuccess={handleSuccess} />}
  
        {completedPayments.length > 0 && (
          <div style={{ marginTop: '24px' }}>
            <h2>Payment History</h2>
            <table border="1" style={{ width: '100%', marginTop: '12px', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Amount</th>
                  <th>Service</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {completedPayments.map((payment, index) => (
                  <tr key={index}>
                    <td>{payment.email}</td>
                    <td>${payment.price}</td>
                    <td>{payment.service}</td>
                    <td>{payment.time}</td>
                    <td style={{ color: payment.status === 'Completed' ? 'green' : 'red' }}>{payment.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
  
  export default Subservice;