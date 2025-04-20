import { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: {
    className: 'w-[400px] mx-auto mt-10',
    defaultValue: 'tab1',
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList className='w-full'>
        <TabsTrigger value='tab1'>Tab 1</TabsTrigger>
        <TabsTrigger value='tab2'>Tab 2</TabsTrigger>
        <TabsTrigger value='tab3'>Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value='tab1'>
        <div className='p-4 bg-gray-100 rounded-lg'>Content for Tab 1</div>
      </TabsContent>
      <TabsContent value='tab2'>
        <div className='p-4 bg-gray-100 rounded-lg'>Content for Tab 2</div>
      </TabsContent>
      <TabsContent value='tab3'>
        <div className='p-4 bg-gray-100 rounded-lg'>Content for Tab 3</div>
      </TabsContent>
    </Tabs>
  ),
};

export const WithoutDefaultTab: Story = {
  render: (args) => (
    <Tabs {...args} defaultValue={undefined}>
      <TabsList className='w-full'>
        <TabsTrigger value='tab1'>Tab 1</TabsTrigger>
        <TabsTrigger value='tab2'>Tab 2</TabsTrigger>
      </TabsList>
      <TabsContent value='tab1'>
        <div className='p-4 bg-gray-100 rounded-lg'>Content for Tab 1</div>
      </TabsContent>
      <TabsContent value='tab2'>
        <div className='p-4 bg-gray-100 rounded-lg'>Content for Tab 2</div>
      </TabsContent>
    </Tabs>
  ),
};
