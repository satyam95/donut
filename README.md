# Donut UI

**Donut UI** is a sleek React component library designed to work seamlessly with Tailwind CSS. It provides a variety of UI components that are easily customizable with your own color themes.

## Prerequisites

- **React**: Ensure your project is set up with React.
- **Tailwind CSS**: This library uses Tailwind CSS, so make sure it's installed and properly configured in your project.

## Installation

Install **Donut UI** via npm:

```bash
npm install @satyam95/donutui
```

## Tailwind CSS Theme Configuration

For Tailwind CSS 4+, update your base colors by including the following CSS variables in your configuration. You can add them directly within your CSS file or update your Tailwind configuration to include your custom theme:

## Usage Example

After installation and configuration, you can start using the components in your project. Below is an example demonstrating how to import and use the **Button** component:

```css
@theme {
  --color-primary: oklch(22.5% 0.146 265.82);
  --color-primary-foreground: oklch(100% 0 0);
  --color-secondary: oklch(0.69 0.146 265.82);
  --color-secondary-foreground: oklch(100% 0 0);
  --color-destructive: oklch(63.7% 0.237 25.331);
  --color-background: oklch(1 0 0);
  --color-accent: oklch(0.97 0 0);
}
```

```tsx
import React from 'react';
import { Button } from 'donut-ui';

const App = () => {
  return (
    <div className='p-4'>
      <Button>Default Button</Button>
    </div>
  );
};

export default App;
```

## Contributing

Contributions, bug reports, and feature requests are welcome! If you'd like to contribute, please open an issue or submit a pull request in the GitHub repository.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
