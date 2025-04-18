import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarFallback, AvatarImage } from '../components';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional custom styles for the Avatar.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage
        src='https://randomuser.me/api/portraits/men/32.jpg'
        alt='Avatar Image'
      />
      <AvatarFallback>SS</AvatarFallback>
    </Avatar>
  ),
  args: {
    className: '',
  },
};

export const WithImage: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage
        src='https://randomuser.me/api/portraits/men/32.jpg'
        alt='User Avatar'
      />
      <AvatarFallback />
    </Avatar>
  ),
  args: {
    className: '',
  },
};

export const FallbackOnly: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>NA</AvatarFallback>
    </Avatar>
  ),
  args: {
    className: 'bg-gray-300',
  },
};

export const CustomSize: Story = {
  render: (args) => (
    <Avatar className={`h-16 w-16 ${args.className}`}>
      <AvatarImage
        src='https://randomuser.me/api/portraits/women/44.jpg'
        alt='Custom Size Avatar'
      />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
  args: {
    className: '',
  },
};

export const NoImageFallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>XX</AvatarFallback>
    </Avatar>
  ),
  args: {
    className: 'bg-red-400 text-white',
  },
};
