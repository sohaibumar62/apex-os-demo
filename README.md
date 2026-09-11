# Apex OS Demo

Early-stage interactive demonstration of **Apex OS**, the clinical logistics operating system being developed for **Apex Medical OC**.

## Purpose

This repository contains a limited client demonstration of selected Apex OS concepts.

It is intended to demonstrate the proposed operational workflow and user experience while the production Apex OS platform is under active development.

## Current Demo

The current demonstration includes:

* Operations Dashboard
* Dispatch Management
* Demo Dispatch Creation
* Driver Assignment
* Dispatch Status Progression
* Active Pulse
* Simulated Vehicle Location
* Simulated Cold-Chain Temperature Monitoring

## Demo Workflow

The current demonstration supports the following simplified workflow:

```text
Dashboard
    ↓
Dispatch
    ↓
Create / Select Dispatch
    ↓
Assign Driver
    ↓
Assigned
    ↓
En Route
    ↓
In Transit
    ↓
Delivered
```

## Active Pulse

Active Pulse provides an early demonstration of the planned operational command center, including:

* Active transport information
* Driver information
* Pickup and destination
* Current dispatch status
* Simulated vehicle position
* Simulated temperature monitoring
* 33°F–46°F cold-chain operating range

## Technology

The demonstration application uses:

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Lucide React

## Run Locally

### Requirements

* Node.js
* npm

### Installation

Clone the repository:

```bash
git clone https://github.com/YOUR-USERNAME/apex-os-demo.git
cd apex-os-demo
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The terminal will display the local development URL, typically:

```text
http://localhost:5173
```

## Production Build

Create an optimized production build with:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Demonstration Environment

This application is an **interactive product preview**, not the production Apex OS platform.

The following information is simulated:

* Clients
* Drivers
* Vehicles
* Dispatch records
* GPS/location information
* Temperature telemetry
* Operational events

The demo is not connected to production systems, physical vehicles, temperature sensors, or live Apex Medical OC operational data.

## Production Apex OS

The production platform is being developed separately using an architecture that includes:

* Laravel
* PostgreSQL
* Redis
* React
* TypeScript
* Flutter
* Real-time operational services

Additional capabilities will be introduced incrementally as production development progresses.

## Status

**Early-stage interactive demonstration**

The demo intentionally represents only selected core functionality and should not be interpreted as the completed Apex OS product.

---

**Apex Medical OC**
*Stat Integrity. Specialist Results.*
