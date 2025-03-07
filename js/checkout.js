// Recuperar carrinho do localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = 0;

// Preencher resumo do pedido
function updateOrderSummary() {
    const orderItems = document.getElementById('orderItems');
    const orderTotal = document.getElementById('orderTotal');
    
    orderItems.innerHTML = '';
    total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemElement = document.createElement('div');
        itemElement.className = 'order-item';
        itemElement.innerHTML = `
            <div>${item.quantity}x ${item.name}</div>
            <div>R$ ${itemTotal.toFixed(2)}</div>
        `;
        
        orderItems.appendChild(itemElement);
    });

    orderTotal.textContent = `R$ ${total.toFixed(2)}`;
}

// Manipular envio do formulário
document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const customerName = document.getElementById('customerName').value;
    const tableNumber = document.getElementById('tableNumber').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked');
    
    if (!customerName || !tableNumber || !paymentMethod) {
        alert('Por favor, preencha todos os campos e selecione uma forma de pagamento.');
        return;
    }

    // Criar mensagem do WhatsApp
    let message = `*BURGER & GRILL HOUSE*\n`;
    message += `--------------------------------\n\n`;
    message += `*NOVO PEDIDO*\n\n`;
    message += `*Nome:* ${customerName}\n`;
    message += `*Mesa:* ${tableNumber}\n`;
    message += `*Pagamento:* ${paymentMethod.value}\n\n`;
    
    message += `*ITENS PEDIDOS:*\n`;
    message += `--------------------------------\n`;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        message += `• ${item.quantity}x ${item.name}`;
        
        // Adicionar informações de personalização
        if (item.customizations) {
            if (item.customizations.extras.length > 0) {
                message += `\n  *Adicionar:* ${item.customizations.extras.map(i => i.name).join(', ')}`;
            }
            if (item.customizations.remove.length > 0) {
                message += `\n  *Remover:* ${item.customizations.remove.map(i => i.name).join(', ')}`;
            }
        }
        
        message += `\n  R$ ${itemTotal.toFixed(2)}\n\n`;
    });
    
    message += `--------------------------------\n`;
    message += `*TOTAL A PAGAR: R$ ${total.toFixed(2)}*\n\n`;
    message += `*Tempo de Preparo:* 15-20 minutos\n`;
    message += `--------------------------------\n`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "5511999999999"; // Número do WhatsApp do estabelecimento
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Limpar carrinho
    localStorage.removeItem('cart');
    
    // Redirecionar para WhatsApp
    window.location.href = whatsappURL;
});

// Inicializar página
document.addEventListener('DOMContentLoaded', function() {
    if (cart.length === 0) {
        window.location.href = 'index.html';
    } else {
        updateOrderSummary();
    }
}); 