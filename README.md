### Estudio-Cactus-Fullstack-Test

## Description

The **Room Configurator** is a web application that allows users to design and visualize interior spaces using different points and materials. Users can add points of interest to a floor plan, select materials, and visualize layers to create a customized design.

## Features

- **Point Visualization**: Points are represented on a floor plan and can be manipulated by the user.
- **Material Selection**: Users can choose from different materials and see a preview of them.
- **Material Layers**: Materials can have associated layers that are displayed based on the selected points.
- **Real-Time Interaction**: Changes to points and materials are immediately reflected in the visualization.

## Technologies

- **NextJS**
- **Firebase**
- **TypeScript**
- **Tailwind CSS**

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/josebladex/Estudio-Cactus-Fullstack-Test


2. Install dependencies:
   ```bash
   pnpm -i

3. Run the application:
   ```bash
   pnpm run dev   

## The responsive design is not optimal because the coordinates of each button follow a constant in the backend. It can be improved by making these coordinates dynamic based on the device's area, saving two database queries.