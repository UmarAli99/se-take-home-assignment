# McDonald's Order Controller Prototype

## Description

This project is a simple prototype of an order controller for McDonald's automated cooking bots. It allows the user to manage orders and cooking bots dynamically. Orders can be placed by normal customers or VIP customers, and bots process these orders in a priority queue system where VIP orders are processed first.

The main functionalities include:
- Submitting new orders (normal or VIP).
- Managing the number of available cooking bots.
- Processing orders using available bots (with priority for VIP orders).
- Displaying the order status as either "Pending," "Processing," or "Complete."
- Distinguishing between Normal and VIP orders.

## Features

- **Normal and VIP Order Handling**:
  - Normal customers' orders are processed in the order they are received.
  - VIP customers' orders are prioritized over normal orders.
  
- **Cooking Bots**:
  - Each bot can only process one order at a time.
  - A bot takes 10 seconds to process an order.
  - Adding or removing bots dynamically affects the order flow.

- **Order Status**:
  - Orders can be in one of three states: **Pending**, **Processing**, or **Complete**.
  - Completed orders display whether they are VIP or Normal.

## User Stories

1. **Normal Customer**: After submitting an order, it should appear in the "Pending" area. After a bot processes the order, it should move to the "Complete" area.
   
2. **VIP Customer**: VIP orders should be placed ahead of normal orders in the queue, but behind other VIP orders.
   
3. **Manager**: The manager can increase or decrease the number of cooking bots. When increasing the bots, any pending orders should be processed immediately. If a bot is removed while processing an order, the order should return to the pending queue.

4. **Bot**: Each bot can only handle one order at a time, and processing takes 10 seconds.

## How to Run

### 1. Prerequisites

No external libraries or dependencies are required. The project uses basic HTML, CSS, and JavaScript. You can run the project in any modern browser.

### 2. Steps to Run Locally

1. **Clone the Repository**:
   Fork the repository and clone it to your local machine.
   ```bash
   git clone https://github.com/UmarAli99/mcdonalds-order-controller.git

2. **Run the Code**
    cd se-take-home-assignment
    Type "npx http-server"
    Press Enter
    Open your browser and navigate to http://localhost:8080
    Please use private IP Address for the best results    
