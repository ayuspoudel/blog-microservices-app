# Blog Microservices App

## Overview

This project demonstrates key concepts in building applications using a microservices architecture. It covers the following topics:

- Fundamental ideas behind microservices  
- Managing data within distributed services  
- Challenges related to data in microservices  
- Handling synchronous communication between services  
- Implementing event-based communication and unconventional data storage strategies  

---

## Blog Application Description

The Blog App is a basic platform that allows users to:

- Create blog posts  
- Comment on individual posts  
- View a dashboard displaying all posts, the number of comments per post, and a preview of recent comments  

Key features include:

- Unlimited post creation  
- Comments associated with specific posts  
- Real-time display of posts and related comment data on the dashboard  

---

## Microservice Architecture

### Services Overview

Each core resource in the system is managed by its own independent service. The application currently consists of the following services:

1. Posts Service  
   - Create new posts  
   - Retrieve a list of all posts  

2. Comments Service  
   - Create comments associated with posts  
   - Retrieve comments related to specific posts  

---

### Architectural Challenges

- **Dependency Between Posts and Comments**  
  Although comments are tied to specific posts, the system maintains them as separate services to adhere to microservices principles.

- **Efficient Data Retrieval**  
  When displaying the top posts on the dashboard, the application must only fetch comments associated with those posts rather than retrieving all comments at once.

- **Inter-Service Communication**  
  To improve scalability and reduce tight coupling, communication between services is handled asynchronously using an event-driven architecture rather than synchronous calls.

---

## Project Objectives

This project is designed to:

- Demonstrate how microservices can work together while remaining independent  
- Explore practical solutions to common challenges in distributed systems  
- Illustrate the benefits and trade-offs of using event-based data synchronization  

---
