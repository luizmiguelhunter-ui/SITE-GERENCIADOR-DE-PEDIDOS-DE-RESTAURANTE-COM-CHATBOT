// =========================================================
// DADOS DO CARDÁPIO - CHAPLIN ESFIHARIA (COM FOTOS AMPLIADAS)
// =========================================================
const menuItems = [
    {
        id: 1,
        category: 'destaques',
        categoryLabel: 'Mais Pedidos',
        name: 'Esfiha de Carne Tradicional',
        description: 'Massa artesanal fofinha, carne bovina temperada com especiarias árabes, tomate fresco e cebola picada.',
        price: 15.70,
        image: 'https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/1044656/998cbce61111.jpg'
    },
    {
        id: 2,
        category: 'destaques',
        categoryLabel: 'Mais Pedidos',
        name: 'Esfiha de Frango com Requeijão',
        description: 'Peito de frango desfiado e temperado, coberto com generosa camada de requeijão cremoso.',
        price: 17.40,
        image: 'https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/1044647/ce84cb3efr.png'
    },
    {
        id: 3,
        category: 'combos',
        categoryLabel: 'Combos Especiais',
        name: 'Combo Chaplin Individual',
        description: '1 Carne + 1 Queijo Mussarela + 1 Coca-lata 350 mL',
        price: 35.00,
        image: 'https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/1044649/4d362946lom.jpg'
    },
    {
        id: 4,
        category: 'combos',
        categoryLabel: 'Combos Especiais',
        name: 'Combo Casal + Refrigerante',
        description: '4 Esfihas salgadas à sua escolha + 2 Coca-lata 350 mL.',
        price: 60.00,
        image: 'https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/1044655/f075746cabobrinha.jpeg'
    },
    {
        id: 5,
        category: 'salgadas',
        categoryLabel: 'Esfihas Salgadas',
        name: 'Esfiha de Calabresa com Queijo',
        description: 'Calabresa fatiada de primeira qualidade, mussarela derretida e um toque de orégano.',
        price: 17.40,
        image: 'https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/1044652/be64cc14calabres.png'
    },
    {
        id: 6,
        category: 'salgadas',
        categoryLabel: 'Esfihas Salgadas',
        name: 'Esfiha Quatro Queijos',
        description: 'Combinação cremosa de mussarela, provolone, parmesão ralado e requeijão cremoso.',
        price: 19.80,
        image: 'https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/1044650/a27c520boo.jpg'
    },
    {
        id: 7,
        category: 'salgadas',
        categoryLabel: 'Esfihas Salgadas',
        name: 'Esfiha de Bacon Crocante com Cheddar',
        description: 'Cubos de bacon fritos na hora sobre base de cheddar cremoso e mussarela.',
        price: 17.40,
        image: 'https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/1283037/6bf1eca5bacon.png'
    },
    {
        id: 8,
        category: 'doces',
        categoryLabel: 'Esfihas Doces',
        name: 'Esfiha Creme de Avelã',
        description: 'Chocolate creme de Avelã derretido na medida certa.',
        price: 19.70,
        image: 'https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/2138618/6cb49dc1esfiha_doce.jpg'
    },
    {
        id: 9,
        category: 'doces',
        categoryLabel: 'Esfihas Doces',
        name: 'Esfiha Romeu e Julieta',
        description: 'Queijo mussarela derretido combinado com goiabada cremosa artesanal.',
        price: 19.50,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRL2M6bSGGNT2fwtHmGREM2ICOXjhbi9WNySsacAsFzaQ&s'
    },
    {
        id: 10,
        category: 'bebidas',
        categoryLabel: 'Bebidas',
        name: 'Coca-Cola 2 Litros',
        description: 'Garrafa 2L bem gelada para acompanhar seu pedido.',
        price: 16.50,
        image: 'https://www.doceriasaojose.com.br/fotos/doceriasaojose/produtos/205.webp'
    },
    {
        id: 11,
        category: 'bebidas',
        categoryLabel: 'Bebidas',
        name: 'Suco Natural de Laranja 500ml',
        description: 'Suco espremido na hora, 100% natural e sem conservantes.',
        price: 14.50,
        image: 'https://storage.googleapis.com/prod-cardapio-web/uploads/item/image/2138769/c9863089D8UN25HUS0_140509471944464_2__2_(2).jpg'
    }
];

let cart = [];
let currentModalItem = null;
let currentModalQty = 1;

// Formatação de Moeda
const formatBRL = (val) => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

// Renderizar Cardápio
function renderMenu(filterCat = 'todos', searchTerm = '') {
    const container = document.getElementById('menuContainer');
    container.innerHTML = '';

    const categories = [
        { key: 'destaques', title: '🔥 Mais Pedidos' },
        { key: 'combos', title: '🎁 Combos Especiais' },
        { key: 'salgadas', title: '🥩 Esfihas Salgadas' },
        { key: 'doces', title: '🍫 Esfihas Doces' },
        { key: 'bebidas', title: '🥤 Bebidas' }
    ];

    categories.forEach(cat => {
        if (filterCat !== 'todos' && filterCat !== cat.key) return;

        const filteredItems = menuItems.filter(item => {
            const matchCat = item.category === cat.key;
            const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item.description.toLowerCase().includes(searchTerm.toLowerCase());
            return matchCat && matchSearch;
        });

        if (filteredItems.length === 0) return;

        const section = document.createElement('section');
        section.className = 'menu-section';
        section.innerHTML = `<h2 class="section-heading">${cat.title}</h2>`;

        const grid = document.createElement('div');
        grid.className = 'products-grid';

        filteredItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="product-thumb" loading="lazy">
                <div class="product-info">
                    <div>
                        <h3 class="product-title">${item.name}</h3>
                        <p class="product-desc">${item.description}</p>
                    </div>
                    <div class="product-bottom">
                        <span class="product-price">${formatBRL(item.price)}</span>
                        <button class="btn-quick-add">+ Adicionar</button>
                    </div>
                </div>
            `;
            card.addEventListener('click', () => openProductModal(item));
            grid.appendChild(card);
        });

        section.appendChild(grid);
        container.appendChild(section);
    });
}

// Abrir Modal de Detalhes
function openProductModal(item) {
    currentModalItem = item;
    currentModalQty = 1;

    document.getElementById('modalImg').src = item.image;
    document.getElementById('modalCategory').innerText = item.categoryLabel;
    document.getElementById('modalTitle').innerText = item.name;
    document.getElementById('modalDesc').innerText = item.description;
    document.getElementById('itemObs').value = '';
    document.getElementById('modalQty').innerText = currentModalQty;
    updateModalSubtotal();

    document.getElementById('productModal').classList.add('active');
}

function updateModalSubtotal() {
    if (!currentModalItem) return;
    const total = currentModalItem.price * currentModalQty;
    document.getElementById('modalSubtotal').innerText = formatBRL(total);
}

// Controles do Modal
document.getElementById('closeProductModal').addEventListener('click', () => {
    document.getElementById('productModal').classList.remove('active');
});

document.getElementById('modalMinus').addEventListener('click', () => {
    if (currentModalQty > 1) {
        currentModalQty--;
        document.getElementById('modalQty').innerText = currentModalQty;
        updateModalSubtotal();
    }
});

document.getElementById('modalPlus').addEventListener('click', () => {
    currentModalQty++;
    document.getElementById('modalQty').innerText = currentModalQty;
    updateModalSubtotal();
});

document.getElementById('confirmAddBtn').addEventListener('click', () => {
    const obs = document.getElementById('itemObs').value.trim();
    cart.push({
        ...currentModalItem,
        qty: currentModalQty,
        obs: obs,
        cartId: Date.now()
    });
    updateCartUI();
    document.getElementById('productModal').classList.remove('active');
});

// Atualizar Carrinho
function updateCartUI() {
    const bar = document.getElementById('floatingCartBar');
    const totalCount = cart.reduce((acc, item) => acc + item.qty, 0);
    const totalValue = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

    if (totalCount > 0) {
        bar.style.display = 'block';
        document.getElementById('cartCount').innerText = totalCount;
        document.getElementById('cartTotalBar').innerText = formatBRL(totalValue);
    } else {
        bar.style.display = 'none';
    }

    const list = document.getElementById('cartItemsList');
    list.innerHTML = '';

    cart.forEach(item => {
        const row = document.createElement('div');
        row.className = 'cart-item-row';
        row.innerHTML = `
            <div class="cart-item-details">
                <h4>${item.qty}x ${item.name}</h4>
                ${item.obs ? `<small>Obs: ${item.obs}</small>` : ''}
                <strong>${formatBRL(item.price * item.qty)}</strong>
            </div>
            <button class="btn-remove-item" onclick="removeCartItem(${item.cartId})">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        list.appendChild(row);
    });

    document.getElementById('cartFinalTotal').innerText = formatBRL(totalValue);
}

window.removeCartItem = (cartId) => {
    cart = cart.filter(i => i.cartId !== cartId);
    updateCartUI();
    if (cart.length === 0) {
        document.getElementById('cartModal').classList.remove('active');
    }
};

// Abrir / Fechar Modal do Carrinho
document.getElementById('floatingCartBar').addEventListener('click', () => {
    document.getElementById('cartModal').classList.add('active');
});

document.getElementById('closeCartModal').addEventListener('click', () => {
    document.getElementById('cartModal').classList.remove('active');
});

// Enviar Pedido para WhatsApp
document.getElementById('sendWhatsappBtn').addEventListener('click', () => {
    const name = document.getElementById('clientName').value.trim();
    const address = document.getElementById('clientAddress').value.trim();
    const payment = document.getElementById('paymentMethod').value;

    if (!name || !address) {
        alert('Por favor, preencha seu nome e endereço de entrega.');
        return;
    }

    let msg = `*NOVO PEDIDO - CHAPLIN ESFIHARIA*\n\n`;
    msg += `*Cliente:* ${name}\n`;
    msg += `*Endereço:* ${address}\n`;
    msg += `*Pagamento:* ${payment}\n\n`;
    msg += `*ITENS DO PEDIDO:*\n`;

    let total = 0;
    cart.forEach(item => {
        const sub = item.price * item.qty;
        total += sub;
        msg += `• ${item.qty}x ${item.name} (${formatBRL(sub)})\n`;
        if (item.obs) msg += `  _Obs: ${item.obs}_\n`;
    });

    msg += `\n*TOTAL: ${formatBRL(total)}*`;

    const phone = '5514996431017'; // WhatsApp oficial informado pela loja
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
});

// Filtros de Categoria e Busca
let activeCat = 'todos';
document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCat = btn.getAttribute('data-category');
        renderMenu(activeCat, document.getElementById('searchInput').value);
    });
});

document.getElementById('searchInput').addEventListener('input', (e) => {
    renderMenu(activeCat, e.target.value);
});

// Inicializar
renderMenu();

// Horário de atendimento: todos os dias, 18h às 23h, fuso de Botucatu (São Paulo).
function updateStoreStatus() {
    const badge = document.getElementById('storeStatus');
    if (!badge) return;
    const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date());
    const hour = Number(parts.find(p => p.type === 'hour').value);
    const minute = Number(parts.find(p => p.type === 'minute').value);
    const isOpen = hour >= 18 && hour < 23;
    badge.classList.toggle('open', isOpen);
    badge.classList.toggle('closed', !isOpen);
    badge.innerHTML = `<i class="fa-solid fa-circle"></i> ${isOpen ? 'Aberto agora' : 'Fechado agora'}`;
    badge.title = 'Atendimento todos os dias, das 18h às 23h (horário de Brasília)';
}
updateStoreStatus();
setInterval(updateStoreStatus, 30000);
