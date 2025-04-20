import { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../components/Accordion';

const meta: Meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['single', 'multiple'],
    },
    defaultOpenKeys: {
      control: 'object',
    },
    className: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const SingleAccordion: Story = {
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem id='item-1'>
        <AccordionTrigger>Item 1</AccordionTrigger>
        <AccordionContent>This is the content for item 1.</AccordionContent>
      </AccordionItem>
      <AccordionItem id='item-2'>
        <AccordionTrigger>Item 2</AccordionTrigger>
        <AccordionContent>This is the content for item 2.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  args: {
    type: 'single',
    defaultOpenKeys: ['item-1'],
  },
};

export const MultipleAccordion: Story = {
  render: (args) => (
    <Accordion {...args}>
      <AccordionItem id='item-1'>
        <AccordionTrigger>Item 1</AccordionTrigger>
        <AccordionContent>This is the content for item 1.</AccordionContent>
      </AccordionItem>
      <AccordionItem id='item-2'>
        <AccordionTrigger>Item 2</AccordionTrigger>
        <AccordionContent>This is the content for item 2.</AccordionContent>
      </AccordionItem>
      <AccordionItem id='item-3'>
        <AccordionTrigger>Item 3</AccordionTrigger>
        <AccordionContent>This is the content for item 3.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  args: {
    type: 'multiple',
    defaultOpenKeys: ['item-1', 'item-2'],
  },
};
