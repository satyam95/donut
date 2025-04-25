import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { Toaster, toast } from '../components';
// Import your Button component (adjust the import based on your project)
import { Button } from '../components'; // Example: Shadcn/UI Button or your custom Button

type ToasterProps = React.ComponentProps<typeof Toaster>;

// Define the meta configuration for the Toaster component
const meta: Meta<typeof Toaster> = {
  title: 'Components/Toaster',
  component: Toaster,
  parameters: {
    layout: 'centered', // Ensures the toaster is displayed in a full-screen context
  }, // Automatically generates documentation
  argTypes: {
    position: {
      control: 'select',
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      description: 'Position of the toaster on the screen',
    },
    visibleToasts: {
      control: 'number',
      description: 'Maximum number of visible toasts at once',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Toaster>;

const ButtonTriggerComponent = (props: ToasterProps) => {
  return (
    <div className='p-4'>
      <Button
        variant='outline'
        onClick={() =>
          toast('Event has been created', {
            description: 'Sunday, December 03, 2023 at 9:00 AM',
            action: {
              label: 'Undo',
              onClick: () => console.log('Undo'),
            },
            duration: 5000,
          })
        }
      >
        Show Toast
      </Button>
      <Toaster {...props} />
    </div>
  );
};

// Button Trigger story: Shows a toast when a button is clicked
export const ButtonTrigger: Story = {
  args: {
    position: 'bottom-right',
    visibleToasts: 3,
  },
  render: (args) => <ButtonTriggerComponent {...args} />,
};

const DefaultComponent = (props: ToasterProps) => {
  useEffect(() => {
    toast('Default Toast', {
      description: 'This is a default toast notification.',
      duration: 5000,
    });
  }, []);

  return <Toaster {...props} />;
};

// Default story: Shows a default toast
export const Default: Story = {
  args: {
    position: 'bottom-right',
    visibleToasts: 3,
  },
  render: (args) => <DefaultComponent {...args} />,
};

const DestructiveComponent = (props: ToasterProps) => {
  useEffect(() => {
    toast.destructive('Error Occurred', {
      description: 'This is a destructive toast notification.',
      duration: 5000,
    });
  }, []);

  return <Toaster {...props} />;
};

// Destructive story: Shows a destructive toast
export const Destructive: Story = {
  args: {
    position: 'bottom-right',
    visibleToasts: 3,
  },
  render: (args) => <DestructiveComponent {...args} />,
};

const WithActionComponent = (props: ToasterProps) => {
  useEffect(() => {
    toast('Action Toast', {
      description: 'This toast includes an action button.',
      action: {
        label: 'Undo',
        onClick: () => alert('Undo clicked!'),
      },
      duration: 5000,
    });
  }, []);

  return <Toaster {...props} />;
};

// With Action story: Shows a toast with an action button
export const WithAction: Story = {
  args: {
    position: 'bottom-right',
    visibleToasts: 3,
  },
  render: (args) => <WithActionComponent {...args} />,
};

const MultipleToastsComponent = (props: ToasterProps) => {
  useEffect(() => {
    toast('First Toast', {
      description: 'This is the first toast.',
      duration: 5000,
    });
    toast.destructive('Second Toast', {
      description: 'This is a destructive toast.',
      duration: 5000,
    });
    toast('Third Toast', {
      description: 'This is the third toast with an action.',
      action: {
        label: 'Retry',
        onClick: () => alert('Retry clicked!'),
      },
      duration: 5000,
    });
  }, []);

  return <Toaster {...props} />;
};

// Multiple Toasts story: Shows multiple toasts at once
export const MultipleToasts: Story = {
  args: {
    position: 'bottom-right',
    visibleToasts: 3,
  },
  render: (args) => <MultipleToastsComponent {...args} />,
};

const DifferentPositionsComponent = (props: ToasterProps) => {
  useEffect(() => {
    toast('Top Left Toast', {
      description: 'This toast is positioned at the top-left.',
      duration: 5000,
    });
  }, []);

  return <Toaster {...props} />;
};

// Different Positions story: Shows toasts in different positions
export const DifferentPositions: Story = {
  args: {
    position: 'top-left',
    visibleToasts: 3,
  },
  render: (args) => <DifferentPositionsComponent {...args} />,
};
