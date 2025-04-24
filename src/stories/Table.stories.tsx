// src/components/Table.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '../components';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => (
    <div className='w-[768px]'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
            <TableCell>Developer</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell>jane@example.com</TableCell>
            <TableCell>Designer</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total: 2 users</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  ),
};

export const WithCheckboxes: Story = {
  render: () => (
    <div className='w-[768px]'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <input type='checkbox' role='checkbox' />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <input type='checkbox' role='checkbox' />
            </TableCell>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <input type='checkbox' role='checkbox' />
            </TableCell>
            <TableCell>Jane Smith</TableCell>
            <TableCell>jane@example.com</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};

export const WithSelectedRow: Story = {
  render: () => (
    <div className='w-[768px]'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow data-state='selected'>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell>jane@example.com</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};

export const WithCaption: Story = {
  render: () => (
    <div className='w-[768px]'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
          </TableRow>
        </TableBody>
        <TableCaption>User List</TableCaption>
      </Table>
    </div>
  ),
};

export const CustomStyles: Story = {
  render: () => (
    <div className='w-[768px]'>
      <Table className='border rounded-lg'>
        <TableHeader className='bg-gray-100'>
          <TableRow className='border-gray-200'>
            <TableHead className='text-blue-600'>Name</TableHead>
            <TableHead className='text-blue-600'>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className='hover:bg-gray-50'>
            <TableCell className='font-bold'>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter className='bg-gray-200'>
          <TableRow>
            <TableCell colSpan={2}>Total: 1 user</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  ),
};

export const FixedWidth: Story = {
  name: 'Fixed Width (768px)',
  render: () => (
    <div className='w-[768px]'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Column 1</TableHead>
            <TableHead>Column 2</TableHead>
            <TableHead>Column 3</TableHead>
            <TableHead>Column 4</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Data 1</TableCell>
            <TableCell>Data 2</TableCell>
            <TableCell>Data 3</TableCell>
            <TableCell>Data 4</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Data 5</TableCell>
            <TableCell>Data 6</TableCell>
            <TableCell>Data 7</TableCell>
            <TableCell>Data 8</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
  parameters: {
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '360px', height: '640px' } },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
      },
      defaultViewport: 'tablet',
    },
  },
};

// Individual Component Stories
export const TableHeaderOnly: Story = {
  render: () => (
    <div className='w-[768px]'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Header 1</TableHead>
            <TableHead>Header 2</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  ),
  name: 'TableHeader',
};

export const TableBodyOnly: Story = {
  render: () => (
    <div className='w-[768px]'>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Cell 1</TableCell>
            <TableCell>Cell 2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
  name: 'TableBody',
};

export const TableFooterOnly: Story = {
  render: () => (
    <div className='w-[768px]'>
      <Table>
        <TableFooter>
          <TableRow>
            <TableCell>Footer 1</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  ),
  name: 'TableFooter',
};

export const TableRowOnly: Story = {
  render: () => (
    <div className='w-[768px]'>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Single Row</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
  name: 'TableRow',
};

export const TableHeadOnly: Story = {
  render: () => (
    <div className='w-[768px]'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Single Header</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  ),
  name: 'TableHead',
};

export const TableCellOnly: Story = {
  render: () => (
    <div className='w-[768px]'>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Single Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
  name: 'TableCell',
};

export const TableCaptionOnly: Story = {
  render: () => (
    <div className='w-[768px]'>
      <Table>
        <TableCaption>Standalone Caption</TableCaption>
      </Table>
    </div>
  ),
  name: 'TableCaption',
};
