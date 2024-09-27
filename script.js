// Order and Bot Management
let pendingOrders = [];
let vipOrders = [];
let completedOrders = [];
let bots = [];
let orderId = 1;

function displayOrders() {
  const pendingList = document.getElementById('pendingOrders');
  const completedList = document.getElementById('completedOrders');

  pendingList.innerHTML = '';
  completedOrders.forEach(order => {
    completedList.innerHTML += `<li>Order #${order.id}</li>`;
  });

  vipOrders.forEach(order => {
    pendingList.innerHTML += `<li>VIP Order #${order.id} - Status: ${order.status}</li>`;
  });

  pendingOrders.forEach(order => {
    pendingList.innerHTML += `<li>Order #${order.id} - Status: ${order.status}</li>`;
  });
}

function addOrder(isVip = false) {
  const order = { id: orderId++, status: 'PENDING' };
  if (isVip) {
    vipOrders.push(order);
  } else {
    pendingOrders.push(order);
  }
  displayOrders();
}

function processOrder(bot) {
  if (vipOrders.length > 0) {
    bot.currentOrder = vipOrders.shift();
  } else if (pendingOrders.length > 0) {
    bot.currentOrder = pendingOrders.shift();
  } else {
    bot.currentOrder = null;
  }

  if (bot.currentOrder) {
    bot.currentOrder.status = 'PROCESSING';
    displayOrders();
    setTimeout(() => {
      completeOrder(bot);
    }, 10000); // 10 seconds to process
  }
}

function completeOrder(bot) {
  if (bot.currentOrder) {
    bot.currentOrder.status = 'COMPLETE';
    completedOrders.push(bot.currentOrder);
    bot.currentOrder = null;
    displayOrders();
    processOrder(bot); // Start processing the next order
  }
}

function addBot() {
  const bot = {
    id: bots.length + 1,
    currentOrder: null
  };
  bots.push(bot);
  processOrder(bot);
}

function removeBot() {
  if (bots.length > 0) {
    const bot = bots.pop();
    if (bot.currentOrder) {
      bot.currentOrder.status = 'PENDING';
      pendingOrders.push(bot.currentOrder); // Return to pending if processing
    }
  }
  displayOrders();
}

// Event Listeners
document.getElementById('newNormalOrder').addEventListener('click', () => addOrder(false));
document.getElementById('newVipOrder').addEventListener('click', () => addOrder(true));
document.getElementById('addBot').addEventListener('click', addBot);
document.getElementById('removeBot').addEventListener('click', removeBot);
