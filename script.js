// Mock Data
const mockData = {
    buyers: [
        {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            phoneNumber: '123-456-7890',
            address: 'New York, USA',
            registrationDate: '2023-01-01',
            totalAmountSpent: 1500,
            preferredPaymentMethod: 'Credit Card',
            purchaseHistory: [
                { id: 'T1', productName: 'Laptop', date: '2023-02-15', amount: 1200 },
                { id: 'T2', productName: 'Mouse', date: '2023-03-10', amount: 300 }
            ]
        },
        {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            phoneNumber: '987-654-3210',
            address: 'Los Angeles, USA',
            registrationDate: '2023-02-15',
            totalAmountSpent: 2300,
            preferredPaymentMethod: 'PayPal',
            purchaseHistory: [
                { id: 'T3', productName: 'Smartphone', date: '2023-03-20', amount: 800 },
                { id: 'T4', productName: 'Headphones', date: '2023-04-05', amount: 1500 }
            ]
        },
        {
            id: '3',
            name: 'Robert Johnson',
            email: 'robert@example.com',
            phoneNumber: '555-123-4567',
            address: 'Chicago, USA',
            registrationDate: '2023-03-10',
            totalAmountSpent: 950,
            preferredPaymentMethod: 'Debit Card',
            purchaseHistory: [
                { id: 'T5', productName: 'Tablet', date: '2023-04-15', amount: 950 }
            ]
        }
    ],
    products: [
        {
            id: '1',
            name: 'Laptop',
            category: 'Electronics',
            price: 1200,
            stockQuantity: 15,
            description: 'High-performance laptop with 16GB RAM and 512GB SSD',
            supplier: 'Tech Supplies Inc',
            images: ['laptop1.jpg', 'laptop2.jpg'],
            relatedItems: ['2', '3']
        },
        {
            id: '2',
            name: 'Mouse',
            category: 'Electronics',
            price: 300,
            stockQuantity: 50,
            description: 'Wireless gaming mouse with RGB lighting',
            supplier: 'Tech Supplies Inc',
            images: ['mouse1.jpg'],
            relatedItems: ['1', '3']
        },
        {
            id: '3',
            name: 'Keyboard',
            category: 'Electronics',
            price: 150,
            stockQuantity: 30,
            description: 'Mechanical keyboard with blue switches',
            supplier: 'Tech Supplies Inc',
            images: ['keyboard1.jpg'],
            relatedItems: ['1', '2']
        },
        {
            id: '4',
            name: 'Smartphone',
            category: 'Electronics',
            price: 800,
            stockQuantity: 5,
            description: 'Latest smartphone with 5G capability',
            supplier: 'Mobile Devices Co',
            images: ['phone1.jpg', 'phone2.jpg'],
            relatedItems: ['5']
        },
        {
            id: '5',
            name: 'Headphones',
            category: 'Electronics',
            price: 1500,
            stockQuantity: 0,
            description: 'Premium noise-cancelling headphones',
            supplier: 'Audio Solutions',
            images: ['headphones1.jpg'],
            relatedItems: ['4']
        },
        {
            id: '6',
            name: 'Tablet',
            category: 'Electronics',
            price: 950,
            stockQuantity: 8,
            description: '10-inch tablet with stylus support',
            supplier: 'Mobile Devices Co',
            images: ['tablet1.jpg'],
            relatedItems: ['4']
        }
    ],
    transactions: [
        {
            id: 'T1',
            buyerId: '1',
            buyerName: 'John Doe',
            productId: '1',
            productName: 'Laptop',
            date: '2023-02-15',
            quantity: 1,
            totalAmount: 1200,
            paymentMethod: 'Credit Card',
            status: 'Completed',
            notes: 'Delivered on time'
        },
        {
            id: 'T2',
            buyerId: '1',
            buyerName: 'John Doe',
            productId: '2',
            productName: 'Mouse',
            date: '2023-03-10',
            quantity: 1,
            totalAmount: 300,
            paymentMethod: 'Credit Card',
            status: 'Completed',
            notes: ''
        },
        {
            id: 'T3',
            buyerId: '2',
            buyerName: 'Jane Smith',
            productId: '4',
            productName: 'Smartphone',
            date: '2023-03-20',
            quantity: 1,
            totalAmount: 800,
            paymentMethod: 'PayPal',
            status: 'Completed',
            notes: ''
        },
        {
            id: 'T4',
            buyerId: '2',
            buyerName: 'Jane Smith',
            productId: '5',
            productName: 'Headphones',
            date: '2023-04-05',
            quantity: 1,
            totalAmount: 1500,
            paymentMethod: 'PayPal',
            status: 'Pending',
            notes: 'Awaiting payment confirmation'
        },
        {
            id: 'T5',
            buyerId: '3',
            buyerName: 'Robert Johnson',
            productId: '6',
            productName: 'Tablet',
            date: '2023-04-15',
            quantity: 1,
            totalAmount: 950,
            paymentMethod: 'Debit Card',
            status: 'Canceled',
            notes: 'Customer requested cancellation'
        }
    ]
};

// DOM Elements
const sidebarLinks = document.querySelectorAll('.nav-links li');
const pages = document.querySelectorAll('.page');
const themeToggle = document.querySelector('.theme-toggle');
const modal = document.getElementById('detail-modal');
const closeBtn = document.querySelector('.close-btn');
const modalBody = document.getElementById('modal-body');
const exportBtn = document.getElementById('export-btn');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize dashboard
    updateDashboardStats();
    renderCharts();
    
    // Initialize tables
    renderBuyersTable();
    renderProductsTable();
    renderTransactionsTable();
    
    // Add event listeners
    setupNavigation();
    setupThemeToggle();
    setupSearchAndFilters();
    setupModal();
    setupExport();
});

// Navigation
function setupNavigation() {
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetPage = link.getAttribute('data-page');
            
            // Update active link
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show target page
            pages.forEach(page => {
                if (page.id === targetPage) {
                    page.classList.add('active');
                } else {
                    page.classList.remove('active');
                }
            });
        });
    });
}

// Theme Toggle
function setupThemeToggle() {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Update icon
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

// Dashboard Stats
function updateDashboardStats() {
    document.getElementById('total-buyers').textContent = mockData.buyers.length;
    document.getElementById('total-products').textContent = mockData.products.length;
    document.getElementById('total-transactions').textContent = mockData.transactions.length;
    
    const totalRevenue = mockData.transactions
        .filter(t => t.status === 'Completed')
        .reduce((sum, t) => sum + t.totalAmount, 0);
    
    document.getElementById('total-revenue').textContent = `$${totalRevenue.toLocaleString()}`;
}

// Charts
function renderCharts() {
    // Sales Trend Chart
    const salesCtx = document.getElementById('sales-chart').getContext('2d');
    const salesData = getSalesTrendData();
    
    new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: salesData.labels,
            datasets: [{
                label: 'Sales',
                data: salesData.data,
                borderColor: '#4a6cf7',
                backgroundColor: 'rgba(74, 108, 247, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => `$${value}`
                    }
                }
            }
        }
    });
    
    // Top Products Chart
    const productsCtx = document.getElementById('products-chart').getContext('2d');
    const productsData = getTopProductsData();
    
    new Chart(productsCtx, {
        type: 'doughnut',
        data: {
            labels: productsData.labels,
            datasets: [{
                data: productsData.data,
                backgroundColor: [
                    '#4a6cf7',
                    '#28a745',
                    '#ffc107',
                    '#dc3545',
                    '#6c757d'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
}

function getSalesTrendData() {
    // Group transactions by month
    const monthlyData = {};
    
    mockData.transactions.forEach(transaction => {
        const date = new Date(transaction.date);
        const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
        
        if (!monthlyData[monthYear]) {
            monthlyData[monthYear] = 0;
        }
        
        if (transaction.status === 'Completed') {
            monthlyData[monthYear] += transaction.totalAmount;
        }
    });
    
    // Sort by date
    const sortedMonths = Object.keys(monthlyData).sort((a, b) => {
        const [monthA, yearA] = a.split('/');
        const [monthB, yearB] = b.split('/');
        return new Date(yearA, monthA - 1) - new Date(yearB, monthB - 1);
    });
    
    return {
        labels: sortedMonths,
        data: sortedMonths.map(month => monthlyData[month])
    };
}

function getTopProductsData() {
    // Count product sales
    const productSales = {};
    
    mockData.transactions.forEach(transaction => {
        if (transaction.status === 'Completed') {
            if (!productSales[transaction.productName]) {
                productSales[transaction.productName] = 0;
            }
            productSales[transaction.productName] += transaction.quantity;
        }
    });
    
    // Sort by sales count
    const sortedProducts = Object.entries(productSales)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    return {
        labels: sortedProducts.map(([name]) => name),
        data: sortedProducts.map(([, count]) => count)
    };
}

// Buyers Table
function renderBuyersTable() {
    const tableBody = document.getElementById('buyers-table-body');
    tableBody.innerHTML = '';
    
    mockData.buyers.forEach(buyer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${buyer.name}</td>
            <td>${buyer.email}</td>
            <td>${buyer.phoneNumber}</td>
            <td>${buyer.address}</td>
            <td>${formatDate(buyer.registrationDate)}</td>
            <td>
                <button class="action-btn view-btn" data-id="${buyer.id}" data-type="buyer">
                    <i class="fas fa-eye"></i> View
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // Add event listeners to view buttons
    document.querySelectorAll('.view-btn[data-type="buyer"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const buyerId = e.currentTarget.getAttribute('data-id');
            showBuyerDetails(buyerId);
        });
    });
}

function showBuyerDetails(buyerId) {
    const buyer = mockData.buyers.find(b => b.id === buyerId);
    
    if (!buyer) return;
    
    modalBody.innerHTML = `
        <h2>${buyer.name}</h2>
        <div class="detail-section">
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> ${buyer.email}</p>
            <p><strong>Phone:</strong> ${buyer.phoneNumber}</p>
            <p><strong>Address:</strong> ${buyer.address}</p>
            <p><strong>Registration Date:</strong> ${formatDate(buyer.registrationDate)}</p>
        </div>
        
        <div class="detail-section">
            <h3>Purchase Summary</h3>
            <p><strong>Total Amount Spent:</strong> $${buyer.totalAmountSpent.toLocaleString()}</p>
            <p><strong>Preferred Payment Method:</strong> ${buyer.preferredPaymentMethod}</p>
        </div>
        
        <div class="detail-section">
            <h3>Purchase History</h3>
            <table class="detail-table">
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Product</th>
                        <th>Date</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    ${buyer.purchaseHistory.map(purchase => `
                        <tr>
                            <td>${purchase.id}</td>
                            <td>${purchase.productName}</td>
                            <td>${formatDate(purchase.date)}</td>
                            <td>$${purchase.amount.toLocaleString()}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Products Table
function renderProductsTable() {
    const tableBody = document.getElementById('products-table-body');
    tableBody.innerHTML = '';
    
    mockData.products.forEach(product => {
        const stockStatus = getStockStatus(product.stockQuantity);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>$${product.price.toLocaleString()}</td>
            <td>
                <span class="stock-indicator ${stockStatus.class}"></span>
                ${product.stockQuantity} (${stockStatus.label})
            </td>
            <td>${product.description}</td>
            <td>
                <button class="action-btn view-btn" data-id="${product.id}" data-type="product">
                    <i class="fas fa-eye"></i> View
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // Add event listeners to view buttons
    document.querySelectorAll('.view-btn[data-type="product"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = e.currentTarget.getAttribute('data-id');
            showProductDetails(productId);
        });
    });
}

function getStockStatus(quantity) {
    if (quantity <= 0) {
        return { label: 'Out of Stock', class: 'stock-out' };
    } else if (quantity <= 10) {
        return { label: 'Low Stock', class: 'stock-low' };
    } else {
        return { label: 'In Stock', class: 'stock-sufficient' };
    }
}

function showProductDetails(productId) {
    const product = mockData.products.find(p => p.id === productId);
    
    if (!product) return;
    
    modalBody.innerHTML = `
        <h2>${product.name}</h2>
        <div class="detail-section">
            <h3>Product Information</h3>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Price:</strong> $${product.price.toLocaleString()}</p>
            <p><strong>Stock:</strong> ${product.stockQuantity}</p>
            <p><strong>Description:</strong> ${product.description}</p>
            <p><strong>Supplier:</strong> ${product.supplier}</p>
        </div>
        
        <div class="detail-section">
            <h3>Product Images</h3>
            <div class="product-images">
                ${product.images.map(image => `
                    <img src="${image}" alt="${product.name}" class="product-image">
                `).join('')}
            </div>
        </div>
        
        <div class="detail-section">
            <h3>Related Items</h3>
            <ul class="related-items">
                ${product.relatedItems.map(itemId => {
                    const relatedProduct = mockData.products.find(p => p.id === itemId);
                    return relatedProduct ? `
                        <li>
                            <a href="#" class="related-item-link" data-id="${relatedProduct.id}">
                                ${relatedProduct.name} - $${relatedProduct.price.toLocaleString()}
                            </a>
                        </li>
                    ` : '';
                }).join('')}
            </ul>
        </div>
    `;
    
    // Add event listeners to related item links
    document.querySelectorAll('.related-item-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const relatedProductId = e.currentTarget.getAttribute('data-id');
            showProductDetails(relatedProductId);
        });
    });
    
    modal.style.display = 'block';
}

// Transactions Table
function renderTransactionsTable() {
    const tableBody = document.getElementById('transactions-table-body');
    tableBody.innerHTML = '';
    
    mockData.transactions.forEach(transaction => {
        const statusClass = `status-${transaction.status.toLowerCase()}`;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.id}</td>
            <td>${transaction.buyerName}</td>
            <td>${transaction.productName}</td>
            <td>${formatDate(transaction.date)}</td>
            <td>${transaction.quantity}</td>
            <td>$${transaction.totalAmount.toLocaleString()}</td>
            <td><span class="status-badge ${statusClass}">${transaction.status}</span></td>
            <td>
                <button class="action-btn view-btn" data-id="${transaction.id}" data-type="transaction">
                    <i class="fas fa-eye"></i> View
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // Add event listeners to view buttons
    document.querySelectorAll('.view-btn[data-type="transaction"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const transactionId = e.currentTarget.getAttribute('data-id');
            showTransactionDetails(transactionId);
        });
    });
}

function showTransactionDetails(transactionId) {
    const transaction = mockData.transactions.find(t => t.id === transactionId);
    
    if (!transaction) return;
    
    const buyer = mockData.buyers.find(b => b.id === transaction.buyerId);
    const product = mockData.products.find(p => p.id === transaction.productId);
    
    modalBody.innerHTML = `
        <h2>Transaction Details</h2>
        <div class="detail-section">
            <h3>Transaction Information</h3>
            <p><strong>Transaction ID:</strong> ${transaction.id}</p>
            <p><strong>Date:</strong> ${formatDate(transaction.date)}</p>
            <p><strong>Status:</strong> <span class="status-badge status-${transaction.status.toLowerCase()}">${transaction.status}</span></p>
            <p><strong>Payment Method:</strong> ${transaction.paymentMethod}</p>
            <p><strong>Quantity:</strong> ${transaction.quantity}</p>
            <p><strong>Total Amount:</strong> $${transaction.totalAmount.toLocaleString()}</p>
            ${transaction.notes ? `<p><strong>Notes:</strong> ${transaction.notes}</p>` : ''}
        </div>
        
        <div class="detail-section">
            <h3>Buyer Information</h3>
            <p><strong>Name:</strong> ${buyer.name}</p>
            <p><strong>Email:</strong> ${buyer.email}</p>
            <p><strong>Phone:</strong> ${buyer.phoneNumber}</p>
            <p><strong>Address:</strong> ${buyer.address}</p>
        </div>
        
        <div class="detail-section">
            <h3>Product Information</h3>
            <p><strong>Name:</strong> ${product.name}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Price:</strong> $${product.price.toLocaleString()}</p>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Search and Filters
function setupSearchAndFilters() {
    // Buyers search and filters
    const buyerSearch = document.getElementById('buyer-search');
    const locationFilter = document.getElementById('location-filter');
    const buyerSort = document.getElementById('buyer-sort');
    
    buyerSearch.addEventListener('input', filterBuyers);
    locationFilter.addEventListener('change', filterBuyers);
    buyerSort.addEventListener('change', filterBuyers);
    
    // Products search and filters
    const productSearch = document.getElementById('product-search');
    const categoryFilter = document.getElementById('category-filter');
    const stockFilter = document.getElementById('stock-filter');
    const productSort = document.getElementById('product-sort');
    
    productSearch.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);
    stockFilter.addEventListener('change', filterProducts);
    productSort.addEventListener('change', filterProducts);
    
    // Transactions search and filters
    const transactionSearch = document.getElementById('transaction-search');
    const statusFilter = document.getElementById('status-filter');
    const dateFrom = document.getElementById('date-from');
    const dateTo = document.getElementById('date-to');
    
    transactionSearch.addEventListener('input', filterTransactions);
    statusFilter.addEventListener('change', filterTransactions);
    dateFrom.addEventListener('change', filterTransactions);
    dateTo.addEventListener('change', filterTransactions);
}

function filterBuyers() {
    const searchTerm = document.getElementById('buyer-search').value.toLowerCase();
    const location = document.getElementById('location-filter').value;
    const sortBy = document.getElementById('buyer-sort').value;
    
    let filteredBuyers = [...mockData.buyers];
    
    // Apply search filter
    if (searchTerm) {
        filteredBuyers = filteredBuyers.filter(buyer => 
            buyer.name.toLowerCase().includes(searchTerm) ||
            buyer.email.toLowerCase().includes(searchTerm) ||
            buyer.phoneNumber.includes(searchTerm)
        );
    }
    
    // Apply location filter
    if (location !== 'all') {
        filteredBuyers = filteredBuyers.filter(buyer => 
            buyer.address.includes(location)
        );
    }
    
    // Apply sorting
    switch (sortBy) {
        case 'name-asc':
            filteredBuyers.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filteredBuyers.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'date-asc':
            filteredBuyers.sort((a, b) => new Date(a.registrationDate) - new Date(b.registrationDate));
            break;
        case 'date-desc':
            filteredBuyers.sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate));
            break;
    }
    
    // Update table
    const tableBody = document.getElementById('buyers-table-body');
    tableBody.innerHTML = '';
    
    filteredBuyers.forEach(buyer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${buyer.name}</td>
            <td>${buyer.email}</td>
            <td>${buyer.phoneNumber}</td>
            <td>${buyer.address}</td>
            <td>${formatDate(buyer.registrationDate)}</td>
            <td>
                <button class="action-btn view-btn" data-id="${buyer.id}" data-type="buyer">
                    <i class="fas fa-eye"></i> View
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // Re-add event listeners to view buttons
    document.querySelectorAll('.view-btn[data-type="buyer"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const buyerId = e.currentTarget.getAttribute('data-id');
            showBuyerDetails(buyerId);
        });
    });
}

function filterProducts() {
    const searchTerm = document.getElementById('product-search').value.toLowerCase();
    const category = document.getElementById('category-filter').value;
    const stock = document.getElementById('stock-filter').value;
    const sortBy = document.getElementById('product-sort').value;
    
    let filteredProducts = [...mockData.products];
    
    // Apply search filter
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    }
    
    // Apply category filter
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => 
            product.category === category
        );
    }
    
    // Apply stock filter
    if (stock !== 'all') {
        switch (stock) {
            case 'in-stock':
                filteredProducts = filteredProducts.filter(product => product.stockQuantity > 10);
                break;
            case 'low-stock':
                filteredProducts = filteredProducts.filter(product => 
                    product.stockQuantity > 0 && product.stockQuantity <= 10
                );
                break;
            case 'out-of-stock':
                filteredProducts = filteredProducts.filter(product => product.stockQuantity === 0);
                break;
        }
    }
    
    // Apply sorting
    switch (sortBy) {
        case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'stock-asc':
            filteredProducts.sort((a, b) => a.stockQuantity - b.stockQuantity);
            break;
        case 'stock-desc':
            filteredProducts.sort((a, b) => b.stockQuantity - a.stockQuantity);
            break;
    }
    
    // Update table
    const tableBody = document.getElementById('products-table-body');
    tableBody.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const stockStatus = getStockStatus(product.stockQuantity);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>$${product.price.toLocaleString()}</td>
            <td>
                <span class="stock-indicator ${stockStatus.class}"></span>
                ${product.stockQuantity} (${stockStatus.label})
            </td>
            <td>${product.description}</td>
            <td>
                <button class="action-btn view-btn" data-id="${product.id}" data-type="product">
                    <i class="fas fa-eye"></i> View
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // Re-add event listeners to view buttons
    document.querySelectorAll('.view-btn[data-type="product"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productId = e.currentTarget.getAttribute('data-id');
            showProductDetails(productId);
        });
    });
}

function filterTransactions() {
    const searchTerm = document.getElementById('transaction-search').value.toLowerCase();
    const status = document.getElementById('status-filter').value;
    const fromDate = document.getElementById('date-from').value;
    const toDate = document.getElementById('date-to').value;
    
    let filteredTransactions = [...mockData.transactions];
    
    // Apply search filter
    if (searchTerm) {
        filteredTransactions = filteredTransactions.filter(transaction => 
            transaction.buyerName.toLowerCase().includes(searchTerm) ||
            transaction.productName.toLowerCase().includes(searchTerm) ||
            transaction.id.toLowerCase().includes(searchTerm)
        );
    }
    
    // Apply status filter
    if (status !== 'all') {
        filteredTransactions = filteredTransactions.filter(transaction => 
            transaction.status === status
        );
    }
    
    // Apply date filter
    if (fromDate) {
        const fromDateObj = new Date(fromDate);
        filteredTransactions = filteredTransactions.filter(transaction => 
            new Date(transaction.date) >= fromDateObj
        );
    }
    
    if (toDate) {
        const toDateObj = new Date(toDate);
        toDateObj.setHours(23, 59, 59, 999); // End of the day
        filteredTransactions = filteredTransactions.filter(transaction => 
            new Date(transaction.date) <= toDateObj
        );
    }
    
    // Update table
    const tableBody = document.getElementById('transactions-table-body');
    tableBody.innerHTML = '';
    
    filteredTransactions.forEach(transaction => {
        const statusClass = `status-${transaction.status.toLowerCase()}`;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.id}</td>
            <td>${transaction.buyerName}</td>
            <td>${transaction.productName}</td>
            <td>${formatDate(transaction.date)}</td>
            <td>${transaction.quantity}</td>
            <td>$${transaction.totalAmount.toLocaleString()}</td>
            <td><span class="status-badge ${statusClass}">${transaction.status}</span></td>
            <td>
                <button class="action-btn view-btn" data-id="${transaction.id}" data-type="transaction">
                    <i class="fas fa-eye"></i> View
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // Re-add event listeners to view buttons
    document.querySelectorAll('.view-btn[data-type="transaction"]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const transactionId = e.currentTarget.getAttribute('data-id');
            showTransactionDetails(transactionId);
        });
    });
}

// Modal
function setupModal() {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Export
function setupExport() {
    exportBtn.addEventListener('click', () => {
        exportTransactionsToCSV();
    });
}

function exportTransactionsToCSV() {
    // Get filtered transactions
    const searchTerm = document.getElementById('transaction-search').value.toLowerCase();
    const status = document.getElementById('status-filter').value;
    const fromDate = document.getElementById('date-from').value;
    const toDate = document.getElementById('date-to').value;
    
    let filteredTransactions = [...mockData.transactions];
    
    // Apply filters (same as in filterTransactions function)
    if (searchTerm) {
        filteredTransactions = filteredTransactions.filter(transaction => 
            transaction.buyerName.toLowerCase().includes(searchTerm) ||
            transaction.productName.toLowerCase().includes(searchTerm) ||
            transaction.id.toLowerCase().includes(searchTerm)
        );
    }
    
    if (status !== 'all') {
        filteredTransactions = filteredTransactions.filter(transaction => 
            transaction.status === status
        );
    }
    
    if (fromDate) {
        const fromDateObj = new Date(fromDate);
        filteredTransactions = filteredTransactions.filter(transaction => 
            new Date(transaction.date) >= fromDateObj
        );
    }
    
    if (toDate) {
        const toDateObj = new Date(toDate);
        toDateObj.setHours(23, 59, 59, 999);
        filteredTransactions = filteredTransactions.filter(transaction => 
            new Date(transaction.date) <= toDateObj
        );
    }
    
    // Create CSV content
    const headers = ['Transaction ID', 'Buyer Name', 'Product Name', 'Date', 'Quantity', 'Total Amount', 'Payment Method', 'Status', 'Notes'];
    const csvContent = [
        headers.join(','),
        ...filteredTransactions.map(transaction => [
            transaction.id,
            `"${transaction.buyerName}"`,
            `"${transaction.productName}"`,
            formatDate(transaction.date),
            transaction.quantity,
            transaction.totalAmount,
            `"${transaction.paymentMethod}"`,
            `"${transaction.status}"`,
            `"${transaction.notes || ''}"`
        ].join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `transactions_${formatDateForFilename(new Date())}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatDateForFilename(date) {
    return date.toISOString().split('T')[0];
} 