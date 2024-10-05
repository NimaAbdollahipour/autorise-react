# Autorise

**Visit Live Website:**
https://autorise-vanilla.web.app/

**Description**
The application serves as a platform for auto galleries to showcase their car models and facilitate communication between sellers and buyers. The platform is designed with three distinct roles: **Admin**, **Seller**, and **Buyer**, each with specific functionalities tailored to their needs.

---

## User Roles and Functionalities

### 1. Admin Role
The Admin is responsible for overseeing the platform's overall management and user roles. The following functionalities should be available to the Admin:

- **Manage Brands**
  - Add new car brands to the system.
  - Edit existing brand details (name, logo, description).
  - Delete brands that are no longer relevant.

- **Manage Colors**
  - Add new colors available for car models.
  - Edit existing colors (name, hex code).
  - Remove colors from the list if they are no longer in use.

- **User Management**
  - View all registered users (Sellers and Buyers).
  - Change roles of users between Admin, Seller, and Buyer.
  - Disable or delete user accounts if necessary.

- **Analytics Dashboard**
  - Access reports and statistics on user activity, car model views, and sales metrics.
  - View performance analytics for Sellers (e.g., top-selling models).

- **Content Moderation**
  - Review and approve submitted car models before they are published to the gallery.
  - Monitor user interactions to ensure compliance with platform guidelines.

---

### 2. Seller Role
Sellers are auto galleries or individual sellers who wish to list their available car models. The following functionalities should be available to Sellers:

- **Car Model Management**
  - **Upload Car Models**
    - Add new car models to the platform, including details such as:
      - Brand
      - Model name
      - Year of manufacture
      - Price
      - Description
      - Images
      - Available colors
  - **Edit Car Models**
    - Update details of existing car listings, including price changes, descriptions, or images.
  - **Delete Car Models**
    - Remove car listings that are no longer available for sale.

- **Inventory Management**
  - View all uploaded car models with the ability to filter by brand, model, and availability status.
  - Track inventory levels for each car model listed.

- **Order Management**
  - View orders received from Buyers, including order status (pending, completed, cancelled).
  - Communicate with Buyers regarding their inquiries or order status.

---

### 3. Buyer Role
Buyers are potential customers looking to browse, search, and interact with available car models. The following functionalities should be available to Buyers:

- **Browse Car Models**
  - View all available car models with images, prices, and descriptions.
  - Access detailed information about each car, including specifications and features.

- **Search and Filter**
  - Search for car models by brand, model name, price range, year of manufacture, and color.
  - Use advanced filtering options to refine search results based on specific criteria.

- **Favorites Management**
  - Save car models to a favorites list for easy access later.
  - View and manage the list of saved favorites.

- **Inquire About Car Models**
  - Contact Sellers with questions or requests for more information about specific car models.

- **User Registration and Profile Management**
  - Create an account to access additional features like saving favorites.
  - Update personal information and manage account settings.

---

Built with:
- React
- Supabase
- iconsax
- daisyui
