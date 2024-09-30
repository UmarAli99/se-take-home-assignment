// Order and Bot Management
let pendingOrders = [];
let vipOrders = [];
let completedOrders = [];
let bots = [];
let orderId = 1; // Unique and increasing order ID

// Function to update the displayed orders in the UI
function displayOrders() {
  const pendingList = document.getElementById('pendingOrders');
  const completedList = document.getElementById('completedOrders');

  pendingList.innerHTML = ''; // Clear the pending list to re-render
  completedList.innerHTML = ''; // Clear the completed list

  // Display completed orders with "complete" class and order type
  completedOrders.forEach(order => {
    completedList.innerHTML += `<li class="complete">${order.orderType} Order #${order.id}</li>`;
  });

  // Display VIP orders in the pending list with "pending" class
  vipOrders.forEach(order => {
    pendingList.innerHTML += `<li class="pending">VIP Order #${order.id} - Status: ${order.status}</li>`;
  });

  // Display normal pending orders with "pending" class
  pendingOrders.forEach(order => {
    pendingList.innerHTML += `<li class="pending">Normal Order #${order.id} - Status: ${order.status}</li>`;
  });
}

// Function to add a new order (either VIP or Normal)
function addOrder(isVip = false) {
  const orderType = isVip ? 'VIP' : 'Normal';
  const order = { id: orderId++, status: 'PENDING', orderType }; // Add orderType

  if (isVip) {
    vipOrders.push(order); // VIP orders have priority, so push to VIP queue
  } else {
    pendingOrders.push(order); // Normal orders go into the normal queue
  }
  
  displayOrders(); // Re-render the order lists
}

// Function to process the next available order for a bot
function processOrder(bot) {
  if (vipOrders.length > 0) {
    bot.currentOrder = vipOrders.shift(); // Bot picks a VIP order first
  } else if (pendingOrders.length > 0) {
    bot.currentOrder = pendingOrders.shift(); // If no VIP orders, pick a normal order
  } else {
    bot.currentOrder = null; // No more orders to process
  }

  if (bot.currentOrder) {
    bot.currentOrder.status = 'PROCESSING';
    displayOrders();

    // Simulate processing time of 10 seconds (10000 ms)
    setTimeout(() => {
      completeOrder(bot); // Complete the order after processing
    }, 10000);
  }
}

// Function to complete the current order for a bot
function completeOrder(bot) {
  if (bot.currentOrder) {
    bot.currentOrder.status = 'COMPLETE'; // Mark the order as complete
    completedOrders.push(bot.currentOrder); // Move it to completed orders
    bot.currentOrder = null; // Bot is now free

    displayOrders();
    processOrder(bot); // Try to process the next order
  }
}

// Function to add a bot and immediately start processing orders if available
function addBot() {
  const bot = {
    id: bots.length + 1, // Unique bot ID
    currentOrder: null
  };
  bots.push(bot); // Add the bot to the bot array
  processOrder(bot); // Start processing orders with the new bot
  updateBotUI();
}

// Function to remove a bot, ensuring any order being processed is returned to the pending queue
// Function to reverse the status of the last completed order
function removeBot() {
  if (completedOrders.length > 0) {
    // Get the last completed order
    let lastCompletedOrder = completedOrders.pop();
    
    // Reverse its status to 'PENDING'
    lastCompletedOrder.status = 'PENDING';

    // Add it back to the appropriate queue (VIP or Normal)
    if (lastCompletedOrder.orderType === 'VIP') {
      vipOrders.push(lastCompletedOrder); // VIP orders go back to the VIP queue
    } else {
      pendingOrders.push(lastCompletedOrder); // Normal orders go back to the normal queue
    }

    // Update the UI to reflect the changes
    displayOrders();
  } else {
    alert("No completed orders to reverse!");
  }
}


// Update the UI for pending orders
function updatePendingOrdersUI() {
  displayOrders(); // Re-renders the order lists
}

// Update the UI for bots
function updateBotUI() {
  // Update the bot count or status in the UI
  document.getElementById('botCount').textContent = `Bots: ${bots.length}`;
}


// Update the UI for pending orders
function updatePendingOrdersUI() {
  displayOrders(); // Re-renders the order lists
}

// Update the UI for bots
function updateBotUI() {
  // Update the bot count or status in the UI
  document.getElementById('botCount').textContent = `Bots: ${bots.length}`;
}

// Event listeners for user actions (buttons)
document.getElementById('newNormalOrder').addEventListener('click', () => addOrder(false)); // Add normal order
document.getElementById('newVipOrder').addEventListener('click', () => addOrder(true));   // Add VIP order
document.getElementById('addBot').addEventListener('click', addBot);                     // Add a new bot
document.getElementById('removeBot').addEventListener('click', removeBot);               // Remove a bot
