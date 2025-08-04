import  { useState } from 'react';
import './mpbutton.css';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  picture_url: string;
  stock: number;
}



const MercadoPagoButton = () => {
  const [loading, setLoading] = useState(false);
  const [preferenceId, _setPreferenceId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'qr' | 'wallet'>('card');
    const [qrCode, setQrCode] = useState<any | null >()

  const products: Product[] = [
    {
      id: 1,
      title: "Zapatos deportivos",
      price: 910,
      description: "Zapatos para correr de última generación",
      picture_url: "https://example.com/zapatos.jpg",
      stock: 10
    },
    {
      id: 2,
      title: "Camiseta premium",
      price: 3500,
      description: "Camiseta 100% algodón",
      picture_url: "https://example.com/camiseta.jpg",
      stock: 15
    }
  ];

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

const handlePayment = async () => {
  if (!selectedProduct) {
    setError("Por favor selecciona un producto");
    return;
  }

  setLoading(true);
  setError(null);
  setQrCode(null); // Resetear QR previo

  try {
    const requestBody = {
      title: selectedProduct.title,
      price: selectedProduct.price,
      quantity: quantity,
      description: selectedProduct.description || '',
      picture_url: selectedProduct.picture_url || '',
      payment_type: paymentMethod,
      payer_email: "test_user_123456@testuser.com",
      success_url: window.location.href,
      failure_url: window.location.href
    };

    const response = await fetch('http://localhost:4000/create_preference', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al crear el pago');
    }

    const data = await response.json();
    
if (paymentMethod === 'qr') {
        if (data.qr_data) {
          setQrCode({
            code: data.qr_data,
            image: data.qr_image || `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(data.qr_data)}`
          });
          return;
        }
        // Fallback si no hay QR (no debería ocurrir)
        window.location.href = data.init_point;
        return;
      }

      // Redirección normal para otros métodos
      window.location.href = data.init_point;


  } catch (err) {
    console.error('Payment error:', {
      error: err,
      timestamp: new Date().toISOString()
    });
    setError(`Error al procesar el pago: ${err instanceof Error ? err.message : 'Error desconocido'}`);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="mercado-pago-container">
      <h2>Productos disponibles</h2>
      
      <div className="product-list">
        {products.map(product => (
          <div 
            key={product.id} 
            className={`product-card ${selectedProduct?.id === product.id ? 'selected' : ''}`}
            onClick={() => setSelectedProduct(product)}
          >
            <img src={product.picture_url} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <span>${product.price.toLocaleString()}</span>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="product-selection">
          <h3>Seleccionaste: {selectedProduct.title}</h3>
          
          <div className="quantity-selector">
            <label>Cantidad:</label>
            <input 
              type="number" 
              min="1" 
              max={selectedProduct.stock} 
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>

          <div className="payment-methods">
            <h4>Método de pago:</h4>
            <div className="method-options">
              <button
                className={paymentMethod === 'card' ? 'active' : ''}
                onClick={() => setPaymentMethod('card')}
              >
                Tarjeta
              </button>
              <button
                className={paymentMethod === 'qr' ? 'active' : ''}
                onClick={() => setPaymentMethod('qr')}
              >
                QR
              </button>
              <button
                className={paymentMethod === 'wallet' ? 'active' : ''}
                onClick={() => setPaymentMethod('wallet')}
              >
                Billetera
              </button>
            </div>
          </div>

          <button 
            onClick={handlePayment}
            disabled={loading}
            className="pay-button"
          >
            {loading ? 'Procesando...' : 'Pagar ahora'}
          </button>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}
      {preferenceId && (
        <div className="success-message">
          <p>Preferencia generada correctamente!</p>
          <p>ID: {preferenceId}</p>
        </div>
      )}

  
{qrCode && (
  <div className="qr-modal">
    <div className="qr-content">
      <h3>Escanee el código QR</h3>
      <img 
        src={qrCode.image} 
        alt="Código QR de pago" 
        className="qr-image"
      />
      <p>O copie este código en la app de Mercado Pago:</p>
      <div className="qr-text">{qrCode.code}</div>
      <button 
        onClick={() => setQrCode(null)}
        className="qr-close-button"
      >
        Cerrar
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default MercadoPagoButton;