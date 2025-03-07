// Ingredientes dos lanches
const burgerIngredients = {
    'X-Burger Especial': [
        { id: 'meat', name: 'Hambúrguer Artesanal' },
        { id: 'cheddar', name: 'Queijo Cheddar' },
        { id: 'lettuce', name: 'Alface' },
        { id: 'tomato', name: 'Tomate' },
        { id: 'special-sauce', name: 'Maionese Especial' }
    ],
    'X-Bacon Supreme': [
        { id: 'meat', name: 'Hambúrguer Artesanal' },
        { id: 'bacon', name: 'Bacon Caramelizado' },
        { id: 'special-cheese', name: 'Queijo Especial' },
        { id: 'smoke-sauce', name: 'Molho Defumado' }
    ],
    'X-Salada Duplo': [
        { id: 'double-meat', name: 'Dois Hambúrgueres' },
        { id: 'cheddar', name: 'Queijo Cheddar' },
        { id: 'lettuce', name: 'Alface Americana' },
        { id: 'tomato', name: 'Tomate' },
        { id: 'onion', name: 'Cebola Caramelizada' },
        { id: 'special-sauce', name: 'Molho Especial' }
    ]
};

// Ingredientes disponíveis e seus preços
const availableIngredients = {
    extras: [
        { id: 'bacon', name: 'Bacon', price: 3.00 },
        { id: 'cheese', name: 'Queijo Extra', price: 2.50 },
        { id: 'onion', name: 'Cebola Caramelizada', price: 2.00 },
        { id: 'egg', name: 'Ovo', price: 2.00 },
        { id: 'salad', name: 'Salada Extra', price: 1.50 }
    ],
    remove: [
        { id: 'lettuce', name: 'Alface' },
        { id: 'tomato', name: 'Tomate' },
        { id: 'onion', name: 'Cebola' },
        { id: 'cheese', name: 'Queijo' },
        { id: 'sauce', name: 'Molho' }
    ]
};

// Opções de refrigerantes
const drinkOptions = [
    { id: 'coca', name: 'Coca-Cola', price: 6.00 },
    { id: 'pepsi', name: 'Pepsi', price: 6.00 },
    { id: 'guarana', name: 'Guaraná Antarctica', price: 6.00 },
    { id: 'sprite', name: 'Sprite', price: 6.00 },
    { id: 'fanta-laranja', name: 'Fanta Laranja', price: 6.00 },
    { id: 'fanta-uva', name: 'Fanta Uva', price: 6.00 }
];

// Opções de Milk Shake
const milkshakeOptions = [
    { id: 'chocolate', name: 'Chocolate Belga', price: 15.00 },
    { id: 'morango', name: 'Morango com Nutella', price: 15.00 },
    { id: 'baunilha', name: 'Baunilha com Caramelo', price: 15.00 },
    { id: 'ovomaltine', name: 'Ovomaltine', price: 16.00 },
    { id: 'cookies', name: 'Cookies & Cream', price: 16.00 },
    { id: 'doce-leite', name: 'Doce de Leite', price: 15.00 }
];

// Opções de Água Mineral
const waterOptions = [
    { id: 'natural', name: 'Água Mineral Natural', price: 5.00 },
    { id: 'gas', name: 'Água Mineral Com Gás', price: 5.00 }
];

// Opções de Super Sundae
const sundaeOptions = [
    { id: 'chocolate', name: 'Chocolate com Calda Quente', price: 18.00 },
    { id: 'morango', name: 'Morango com Calda de Frutas', price: 18.00 },
    { id: 'caramelo', name: 'Caramelo com Amendoim', price: 18.00 },
    { id: 'brownie', name: 'Brownie com Chocolate', price: 19.00 },
    { id: 'cookies', name: 'Cookies com Doce de Leite', price: 19.00 },
    { id: 'banana', name: 'Banana Split', price: 20.00 }
];

// Carrinho de compras
let cart = [];

// Função para abrir modal de personalização
function openCustomizeModal(name, price) {
    const modal = document.createElement('div');
    modal.className = 'customize-modal';
    
    let customizations = {
        extras: [],
        remove: []
    };
    
    // Obter ingredientes do lanche específico
    const burgerIngredientsList = burgerIngredients[name] || [];
    
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Personalizar ${name}</h3>
            <div class="customize-section">
                <h4>Ingredientes do Lanche</h4>
                <div class="ingredients-grid">
                    ${burgerIngredientsList.map(ingredient => `
                        <div class="ingredient-option">
                            <input type="checkbox" id="remove-${ingredient.id}">
                            <label for="remove-${ingredient.id}">
                                Remover ${ingredient.name}
                            </label>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="customize-section">
                <h4>Adicionar Ingredientes</h4>
                <div class="ingredients-grid">
                    ${availableIngredients.extras.map(ingredient => `
                        <div class="ingredient-option">
                            <input type="checkbox" id="add-${ingredient.id}" data-price="${ingredient.price}">
                            <label for="add-${ingredient.id}">
                                ${ingredient.name} (+R$ ${ingredient.price.toFixed(2)})
                            </label>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="modal-total">
                Total: R$ <span class="total-price">${price.toFixed(2)}</span>
            </div>
            <div class="modal-buttons">
                <button class="cancel-button">Cancelar</button>
                <button class="confirm-button">Adicionar ao Pedido</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Atualizar preço total quando ingredientes são selecionados
    const totalPriceElement = modal.querySelector('.total-price');
    let currentTotal = price;
    
    modal.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.id.startsWith('add-')) {
                const ingredientPrice = parseFloat(checkbox.dataset.price);
                currentTotal += checkbox.checked ? ingredientPrice : -ingredientPrice;
            }
            totalPriceElement.textContent = currentTotal.toFixed(2);
        });
    });
    
    // Botão Cancelar
    modal.querySelector('.cancel-button').addEventListener('click', () => {
        modal.remove();
    });
    
    // Botão Confirmar
    modal.querySelector('.confirm-button').addEventListener('click', () => {
        // Coletar personalizações
        modal.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
            if (checkbox.id.startsWith('add-')) {
                const ingredientId = checkbox.id.replace('add-', '');
                const ingredient = availableIngredients.extras.find(i => i.id === ingredientId);
                customizations.extras.push(ingredient);
            } else if (checkbox.id.startsWith('remove-')) {
                const ingredientId = checkbox.id.replace('remove-', '');
                const ingredient = burgerIngredientsList.find(i => i.id === ingredientId);
                customizations.remove.push(ingredient);
            }
        });
        
        // Adicionar ao carrinho com personalizações
        addToCart(name, currentTotal, customizations);
        modal.remove();
    });
}

// Função para abrir modal de seleção de refrigerante
function openDrinkModal(name, price) {
    const modal = document.createElement('div');
    modal.className = 'customize-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Escolha seu Refrigerante</h3>
            <div class="customize-section">
                <h4>Selecione o Refrigerante</h4>
                <div class="ingredients-grid">
                    ${drinkOptions.map(drink => `
                        <div class="ingredient-option">
                            <input type="radio" name="drink-choice" id="${drink.id}" value="${drink.name}">
                            <label for="${drink.id}">
                                ${drink.name}
                            </label>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="customize-section">
                <h4>Preferências</h4>
                <div class="ingredients-grid">
                    <div class="ingredient-option">
                        <input type="radio" name="ice-lemon" id="ice-lemon" value="Gelo e Limão">
                        <label for="ice-lemon">Com Gelo e Limão</label>
                    </div>
                    <div class="ingredient-option">
                        <input type="radio" name="ice-lemon" id="ice-only" value="Apenas Gelo">
                        <label for="ice-only">Apenas Gelo</label>
                    </div>
                    <div class="ingredient-option">
                        <input type="radio" name="ice-lemon" id="no-ice-lemon" value="Sem Gelo e Sem Limão">
                        <label for="no-ice-lemon">Sem Gelo e Sem Limão</label>
                    </div>
                </div>
                <div class="ingredients-grid" style="margin-top: 10px;">
                    <div class="ingredient-option">
                        <input type="checkbox" name="straw" id="with-straw">
                        <label for="with-straw">Com Canudo</label>
                    </div>
                </div>
            </div>
            <div class="modal-buttons">
                <button class="cancel-button">Cancelar</button>
                <button class="confirm-button">Adicionar ao Pedido</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Botão Cancelar
    modal.querySelector('.cancel-button').addEventListener('click', () => {
        modal.remove();
    });
    
    // Botão Confirmar
    modal.querySelector('.confirm-button').addEventListener('click', () => {
        const selectedDrink = modal.querySelector('input[name="drink-choice"]:checked');
        const selectedPreference = modal.querySelector('input[name="ice-lemon"]:checked');
        const wantsStraw = modal.querySelector('#with-straw').checked;
        
        if (!selectedDrink) {
            alert('Por favor, selecione um refrigerante');
            return;
        }
        
        if (!selectedPreference) {
            alert('Por favor, selecione sua preferência de gelo e limão');
            return;
        }
        
        let itemName = selectedDrink.value;
        itemName += `\n- ${selectedPreference.value}`;
        if (wantsStraw) {
            itemName += '\n- Com Canudo';
        }
        
        addToCart(itemName, price);
        modal.remove();
    });
}

// Função para abrir modal de seleção de milk shake
function openMilkshakeModal(name, price) {
    const modal = document.createElement('div');
    modal.className = 'customize-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Escolha o Sabor do Milk Shake</h3>
            <div class="customize-section">
                <div class="ingredients-grid">
                    ${milkshakeOptions.map(shake => `
                        <div class="ingredient-option">
                            <input type="radio" name="milkshake-choice" id="${shake.id}" 
                                   value="${shake.name}" data-price="${shake.price}">
                            <label for="${shake.id}">
                                ${shake.name}
                                ${shake.price > 15.00 ? ` (R$ ${shake.price.toFixed(2)})` : ''}
                            </label>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="modal-total">
                Total: R$ <span class="total-price">${price.toFixed(2)}</span>
            </div>
            <div class="modal-buttons">
                <button class="cancel-button">Cancelar</button>
                <button class="confirm-button">Adicionar ao Pedido</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Atualizar preço quando um sabor é selecionado
    const totalPriceElement = modal.querySelector('.total-price');
    modal.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', () => {
            const selectedPrice = parseFloat(radio.dataset.price);
            totalPriceElement.textContent = selectedPrice.toFixed(2);
        });
    });
    
    // Botão Cancelar
    modal.querySelector('.cancel-button').addEventListener('click', () => {
        modal.remove();
    });
    
    // Botão Confirmar
    modal.querySelector('.confirm-button').addEventListener('click', () => {
        const selectedShake = modal.querySelector('input[name="milkshake-choice"]:checked');
        
        if (!selectedShake) {
            alert('Por favor, selecione um sabor de Milk Shake');
            return;
        }
        
        const selectedPrice = parseFloat(selectedShake.dataset.price);
        addToCart(selectedShake.value, selectedPrice);
        modal.remove();
    });
}

// Função para abrir modal de seleção de água
function openWaterModal(name, price) {
    const modal = document.createElement('div');
    modal.className = 'customize-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Escolha o Tipo de Água</h3>
            <div class="customize-section">
                <h4>Selecione o Tipo</h4>
                <div class="ingredients-grid">
                    ${waterOptions.map(water => `
                        <div class="ingredient-option">
                            <input type="radio" name="water-choice" id="${water.id}" value="${water.name}">
                            <label for="${water.id}">
                                ${water.name}
                            </label>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="customize-section">
                <h4>Preferências</h4>
                <div class="ingredients-grid">
                    <div class="ingredient-option">
                        <input type="radio" name="ice-lemon" id="water-ice-lemon" value="Gelo e Limão">
                        <label for="water-ice-lemon">Com Gelo e Limão</label>
                    </div>
                    <div class="ingredient-option">
                        <input type="radio" name="ice-lemon" id="water-ice-only" value="Apenas Gelo">
                        <label for="water-ice-only">Apenas Gelo</label>
                    </div>
                    <div class="ingredient-option">
                        <input type="radio" name="ice-lemon" id="water-no-ice-lemon" value="Sem Gelo e Sem Limão">
                        <label for="water-no-ice-lemon">Sem Gelo e Sem Limão</label>
                    </div>
                </div>
                <div class="ingredients-grid" style="margin-top: 10px;">
                    <div class="ingredient-option">
                        <input type="checkbox" name="straw" id="water-with-straw">
                        <label for="water-with-straw">Com Canudo</label>
                    </div>
                </div>
            </div>
            <div class="modal-buttons">
                <button class="cancel-button">Cancelar</button>
                <button class="confirm-button">Adicionar ao Pedido</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Botão Cancelar
    modal.querySelector('.cancel-button').addEventListener('click', () => {
        modal.remove();
    });
    
    // Botão Confirmar
    modal.querySelector('.confirm-button').addEventListener('click', () => {
        const selectedWater = modal.querySelector('input[name="water-choice"]:checked');
        const selectedPreference = modal.querySelector('input[name="ice-lemon"]:checked');
        const wantsStraw = modal.querySelector('#water-with-straw').checked;
        
        if (!selectedWater) {
            alert('Por favor, selecione o tipo de água');
            return;
        }
        
        if (!selectedPreference) {
            alert('Por favor, selecione sua preferência de gelo e limão');
            return;
        }
        
        let itemName = selectedWater.value;
        itemName += `\n- ${selectedPreference.value}`;
        if (wantsStraw) {
            itemName += '\n- Com Canudo';
        }
        
        addToCart(itemName, price);
        modal.remove();
    });
}

// Função para abrir modal de seleção de sundae
function openSundaeModal(name, price) {
    const modal = document.createElement('div');
    modal.className = 'customize-modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Monte seu Super Sundae</h3>
            <div class="customize-section">
                <h4>Escolha o Sabor</h4>
                <div class="ingredients-grid">
                    ${sundaeOptions.map(sundae => `
                        <div class="ingredient-option">
                            <input type="radio" name="sundae-choice" id="${sundae.id}" 
                                   value="${sundae.name}" data-price="${sundae.price}">
                            <label for="${sundae.id}">
                                ${sundae.name}
                                ${sundae.price > 18.00 ? ` (R$ ${sundae.price.toFixed(2)})` : ''}
                            </label>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="customize-section">
                <h4>Extras</h4>
                <div class="ingredients-grid">
                    <div class="ingredient-option">
                        <input type="checkbox" id="extra-chantilly" data-price="2.00">
                        <label for="extra-chantilly">Chantilly Extra (+R$ 2,00)</label>
                    </div>
                    <div class="ingredient-option">
                        <input type="checkbox" id="extra-granulado" data-price="1.50">
                        <label for="extra-granulado">Granulado Extra (+R$ 1,50)</label>
                    </div>
                    <div class="ingredient-option">
                        <input type="checkbox" id="extra-calda" data-price="1.50">
                        <label for="extra-calda">Calda Extra (+R$ 1,50)</label>
                    </div>
                </div>
            </div>
            <div class="modal-total">
                Total: R$ <span class="total-price">${price.toFixed(2)}</span>
            </div>
            <div class="modal-buttons">
                <button class="cancel-button">Cancelar</button>
                <button class="confirm-button">Adicionar ao Pedido</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Atualizar preço quando opções são selecionadas
    const totalPriceElement = modal.querySelector('.total-price');
    let currentTotal = price;
    
    // Atualizar preço quando um sabor é selecionado
    modal.querySelectorAll('input[name="sundae-choice"]').forEach(radio => {
        radio.addEventListener('change', () => {
            // Resetar o total para recalcular
            currentTotal = parseFloat(radio.dataset.price);
            
            // Adicionar preços dos extras selecionados
            modal.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
                currentTotal += parseFloat(checkbox.dataset.price);
            });
            
            totalPriceElement.textContent = currentTotal.toFixed(2);
        });
    });
    
    // Atualizar preço quando extras são selecionados
    modal.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const extraPrice = parseFloat(checkbox.dataset.price);
            currentTotal += checkbox.checked ? extraPrice : -extraPrice;
            totalPriceElement.textContent = currentTotal.toFixed(2);
        });
    });
    
    // Botão Cancelar
    modal.querySelector('.cancel-button').addEventListener('click', () => {
        modal.remove();
    });
    
    // Botão Confirmar
    modal.querySelector('.confirm-button').addEventListener('click', () => {
        const selectedSundae = modal.querySelector('input[name="sundae-choice"]:checked');
        
        if (!selectedSundae) {
            alert('Por favor, selecione um sabor de Sundae');
            return;
        }
        
        let itemName = selectedSundae.value;
        
        // Adicionar extras selecionados ao nome do item
        const extras = [];
        if (modal.querySelector('#extra-chantilly').checked) extras.push('Chantilly Extra');
        if (modal.querySelector('#extra-granulado').checked) extras.push('Granulado Extra');
        if (modal.querySelector('#extra-calda').checked) extras.push('Calda Extra');
        
        if (extras.length > 0) {
            itemName += '\nExtras: ' + extras.join(', ');
        }
        
        addToCart(itemName, currentTotal);
        modal.remove();
    });
}

// Modificar a função addToCart para incluir personalizações
function addToCart(name, price, customizations = null) {
    let itemName = name;
    let customizationText = '';
    
    if (customizations) {
        if (customizations.extras.length > 0) {
            customizationText += '\nAdicionar: ' + customizations.extras.map(i => i.name).join(', ');
        }
        if (customizations.remove.length > 0) {
            customizationText += '\nRemover: ' + customizations.remove.map(i => i.name).join(', ');
        }
        if (customizationText) {
            itemName += customizationText;
        }
    }

    const existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity += 1;
        showNotification(`Quantidade de ${name} aumentada para ${existingItem.quantity}!`);
    } else {
        cart.push({
            name: itemName,
            price,
            quantity: 1,
            customizations
        });
        showNotification(`${name} adicionado ao carrinho!`);
    }
    
    updateCart();
}

// Atualizar carrinho
function updateCart() {
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    let total = 0;
    
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        
        total += item.price * item.quantity;
        
        itemElement.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn minus" onclick="updateQuantity('${item.name}', -1)">
                    <i class="fas fa-minus"></i>
                </button>
                <span>${item.quantity}</span>
                <button class="quantity-btn plus" onclick="updateQuantity('${item.name}', 1)">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        `;
        
        cartItems.appendChild(itemElement);
    });
    
    cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    
    // Salvar carrinho no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Atualizar botão de checkout
    updateCheckoutButton();
}

// Atualizar botão de checkout
function updateCheckoutButton() {
    const checkoutButton = document.querySelector('.checkout-button');
    if (cart.length === 0) {
        checkoutButton.style.opacity = '0.5';
        checkoutButton.style.pointerEvents = 'none';
        return;
    }
    
    checkoutButton.style.opacity = '1';
    checkoutButton.style.pointerEvents = 'auto';
    
    // Remover event listeners anteriores
    const newButton = checkoutButton.cloneNode(true);
    checkoutButton.parentNode.replaceChild(newButton, checkoutButton);
    
    // Adicionar novo event listener
    newButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'checkout.html';
    });
}

// Atualizar quantidade de um item
function updateQuantity(name, change) {
    const item = cart.find(item => item.name === name);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            cart = cart.filter(cartItem => cartItem.name !== name);
            showNotification(`${name} removido do carrinho`, 'error');
        } else {
            if (change > 0) {
                showNotification(`Quantidade de ${name} aumentada para ${item.quantity}!`);
            } else {
                showNotification(`Quantidade de ${name} diminuída para ${item.quantity}!`, 'warning');
            }
        }
        
        updateCart();
    }
}

// Modificar os event listeners dos botões de adicionar ao carrinho
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const menuItem = button.closest('.menu-item');
        const name = menuItem.querySelector('h3').textContent;
        const price = parseFloat(menuItem.querySelector('.price').textContent.replace('R$ ', ''));
        
        if (menuItem.closest('#lanches')) {
            openCustomizeModal(name, price);
        } else if (name === 'Refrigerante') {
            openDrinkModal(name, price);
        } else if (name === 'Milk Shake Artesanal') {
            openMilkshakeModal(name, price);
        } else if (name === 'Água Mineral') {
            openWaterModal(name, price);
        } else if (name === 'Super Sundae') {
            openSundaeModal(name, price);
        } else {
            addToCart(name, price);
        }
    });
});

// Sistema de notificações
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = message;

    // Remover notificações anteriores
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());

    document.body.appendChild(notification);

    // Estilos específicos por tipo
    switch(type) {
        case 'success':
            notification.style.backgroundColor = '#48bb78';
            break;
        case 'error':
            notification.style.backgroundColor = '#ef4444';
            break;
        case 'warning':
            notification.style.backgroundColor = '#f59e0b';
            break;
    }

    // Remover após 3 segundos
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Menu mobile
function createMobileMenu() {
    const nav = document.querySelector('.nav-links');
    const burger = document.createElement('div');
    burger.className = 'burger';
    burger.innerHTML = '<div></div><div></div><div></div>';
    
    document.querySelector('.nav-container').appendChild(burger);

    // Função para alternar menu
    const toggleMenu = () => {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
    };

    burger.addEventListener('click', toggleMenu);

    // Fechar menu ao clicar em um link
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('active');
        });
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    createMobileMenu();
    updateCart();
});
