import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '../components';
import { Button } from '../components';

// Meta configuration for the Dialog component
const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: 'Controls whether the dialog is open (controlled mode).',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Sets the initial open state (uncontrolled mode).',
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Callback when the open state changes.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

// Basic Uncontrolled Dialog
export const Uncontrolled: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='default'>Open Dialog</Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Basic Dialog</DialogTitle>
            <DialogDescription>
              This is an uncontrolled dialog. Click the X button or outside to
              close.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  ),
};

// Controlled Dialog
const ControlledDialog = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='secondary'>Open Controlled Dialog</Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Controlled Dialog</DialogTitle>
            <DialogDescription>
              This dialog is controlled by React state. Current state:{' '}
              {open ? 'Open' : 'Closed'}.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export const Controlled: Story = {
  render: ControlledDialog,
};

// Custom Trigger
export const CustomTrigger: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='link' asChild>
          <span>Click this link to open</span>
        </Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Custom Trigger Dialog</DialogTitle>
            <DialogDescription>
              This dialog uses a custom trigger with the asChild prop.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  ),
};

// Dialog with Accessibility Features
const AccessibleDialog = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='default'>Open Accessible Dialog</Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          role='dialog'
          aria-modal='true'
          aria-labelledby='dialog-title'
          aria-describedby='dialog-description'
        >
          <DialogHeader>
            <DialogTitle id='dialog-title'>Accessible Dialog</DialogTitle>
            <DialogDescription id='dialog-description'>
              This dialog includes ARIA attributes and closes with the Escape
              key.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='destructive'>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export const Accessible: Story = {
  render: AccessibleDialog,
};
