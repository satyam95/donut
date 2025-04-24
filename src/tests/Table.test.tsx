import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
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

// Mock the cn utility to simplify class name testing
vi.mock('../lib/utils', () => ({
  cn: (...args: string[]) => args.filter(Boolean).join(' '),
}));

describe('Table Components', () => {
  describe('Table', () => {
    it('renders table with default classes', () => {
      render(<Table />);
      const container = screen.getByTestId('table-container');
      const table = screen.getByTestId('table');
      expect(container).toHaveClass('relative w-full overflow-x-auto');
      expect(table).toHaveClass('w-full caption-bottom text-sm');
    });

    it('applies custom className to table', () => {
      render(<Table className='custom-table' />);
      const table = screen.getByTestId('table');
      expect(table).toHaveClass('w-full caption-bottom text-sm custom-table');
    });

    it('passes additional props to table', () => {
      render(<Table id='table-id' role='grid' />);
      const table = screen.getByTestId('table');
      expect(table).toHaveAttribute('id', 'table-id');
      expect(table).toHaveAttribute('role', 'grid');
    });
  });

  describe('TableHeader', () => {
    it('renders thead with default classes', () => {
      render(
        <Table>
          <TableHeader />
        </Table>
      );
      const header = screen.getByTestId('table-header');
      expect(header).toHaveClass('[&_tr]:border-b');
    });

    it('applies custom className to thead', () => {
      render(
        <Table>
          <TableHeader className='custom-header' />
        </Table>
      );
      const header = screen.getByTestId('table-header');
      expect(header).toHaveClass('[&_tr]:border-b custom-header');
    });

    it('passes additional props to thead', () => {
      render(
        <Table>
          <TableHeader id='header-id' />
        </Table>
      );
      const header = screen.getByTestId('table-header');
      expect(header).toHaveAttribute('id', 'header-id');
    });
  });

  describe('TableBody', () => {
    it('renders tbody with default classes', () => {
      render(
        <Table>
          <TableBody />
        </Table>
      );
      const body = screen.getByTestId('table-body');
      expect(body).toHaveClass('[&_tr:last-child]:border-0');
    });

    it('applies custom className to tbody', () => {
      render(
        <Table>
          <TableBody className='custom-body' />
        </Table>
      );
      const body = screen.getByTestId('table-body');
      expect(body).toHaveClass('[&_tr:last-child]:border-0 custom-body');
    });

    it('passes additional props to tbody', () => {
      render(
        <Table>
          <TableBody id='body-id' />
        </Table>
      );
      const body = screen.getByTestId('table-body');
      expect(body).toHaveAttribute('id', 'body-id');
    });
  });

  describe('TableFooter', () => {
    it('renders tfoot with default classes', () => {
      render(
        <Table>
          <TableFooter />
        </Table>
      );
      const footer = screen.getByTestId('table-footer');
      expect(footer).toHaveClass(
        'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0'
      );
    });

    it('applies custom className to tfoot', () => {
      render(
        <Table>
          <TableFooter className='custom-footer' />
        </Table>
      );
      const footer = screen.getByTestId('table-footer');
      expect(footer).toHaveClass(
        'bg-muted/50 border-t font-medium [&>tr]:last:border-b-0 custom-footer'
      );
    });

    it('passes additional props to tfoot', () => {
      render(
        <Table>
          <TableFooter id='footer-id' />
        </Table>
      );
      const footer = screen.getByTestId('table-footer');
      expect(footer).toHaveAttribute('id', 'footer-id');
    });
  });

  describe('TableRow', () => {
    it('renders tr with default classes', () => {
      render(
        <Table>
          <TableBody>
            <TableRow />
          </TableBody>
        </Table>
      );
      const row = screen.getByTestId('table-row');
      expect(row).toHaveClass(
        'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors'
      );
    });

    it('applies custom className to tr', () => {
      render(
        <Table>
          <TableBody>
            <TableRow className='custom-row' />
          </TableBody>
        </Table>
      );
      const row = screen.getByTestId('table-row');
      expect(row).toHaveClass(
        'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors custom-row'
      );
    });

    it('passes additional props to tr', () => {
      render(
        <Table>
          <TableBody>
            <TableRow id='row-id' data-state='selected' />
          </TableBody>
        </Table>
      );
      const row = screen.getByTestId('table-row');
      expect(row).toHaveAttribute('id', 'row-id');
      expect(row).toHaveAttribute('data-state', 'selected');
    });
  });

  describe('TableHead', () => {
    it('renders th with default classes', () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Header</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );
      const head = screen.getByTestId('table-head');
      expect(head).toHaveClass(
        'text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'
      );
    });

    it('applies custom className to th', () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='custom-head'>Header</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );
      const head = screen.getByTestId('table-head');
      expect(head).toHaveClass(
        'text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] custom-head'
      );
    });

    it('applies checkbox styles when containing a checkbox', () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <input type='checkbox' role='checkbox' />
              </TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );
      const head = screen.getByTestId('table-head');
      expect(head).toHaveClass(
        'text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'
      );
    });

    it('passes additional props to th', () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead id='head-id'>Header</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );
      const head = screen.getByTestId('table-head');
      expect(head).toHaveAttribute('id', 'head-id');
    });
  });

  describe('TableCell', () => {
    it('renders td with default classes', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const cell = screen.getByTestId('table-cell');
      expect(cell).toHaveClass(
        'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'
      );
    });

    it('applies custom className to td', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className='custom-cell'>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const cell = screen.getByTestId('table-cell');
      expect(cell).toHaveClass(
        'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] custom-cell'
      );
    });

    it('applies checkbox styles when containing a checkbox', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <input type='checkbox' role='checkbox' />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const cell = screen.getByTestId('table-cell');
      expect(cell).toHaveClass(
        'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'
      );
    });

    it('passes additional props to td', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell id='cell-id'>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
      const cell = screen.getByTestId('table-cell');
      expect(cell).toHaveAttribute('id', 'cell-id');
    });
  });

  describe('TableCaption', () => {
    it('renders caption with default classes', () => {
      render(
        <Table>
          <TableCaption>Caption</TableCaption>
        </Table>
      );
      const caption = screen.getByTestId('table-caption');
      expect(caption).toHaveClass('text-muted-foreground mt-4 text-sm');
    });

    it('applies custom className to caption', () => {
      render(
        <Table>
          <TableCaption className='custom-caption'>Caption</TableCaption>
        </Table>
      );
      const caption = screen.getByTestId('table-caption');
      expect(caption).toHaveClass(
        'text-muted-foreground mt-4 text-sm custom-caption'
      );
    });

    it('passes additional props to caption', () => {
      render(
        <Table>
          <TableCaption id='caption-id'>Caption</TableCaption>
        </Table>
      );
      const caption = screen.getByTestId('table-caption');
      expect(caption).toHaveAttribute('id', 'caption-id');
    });
  });

  describe('Full Table Structure', () => {
    it('renders a complete table with all components', () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Header 1</TableHead>
              <TableHead>Header 2</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Cell 1</TableCell>
              <TableCell>Cell 2</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>Footer 1</TableCell>
              <TableCell>Footer 2</TableCell>
            </TableRow>
          </TableFooter>
          <TableCaption>Table Caption</TableCaption>
        </Table>
      );

      expect(screen.getByTestId('table-container')).toBeInTheDocument();
      expect(screen.getByTestId('table')).toBeInTheDocument();
      expect(screen.getByTestId('table-header')).toBeInTheDocument();
      expect(screen.getAllByTestId('table-row').length).toBe(3);
      expect(screen.getAllByTestId('table-head').length).toBe(2);
      expect(screen.getByTestId('table-body')).toBeInTheDocument();
      expect(screen.getAllByTestId('table-cell').length).toBe(4);
      expect(screen.getByTestId('table-footer')).toBeInTheDocument();
      expect(screen.getByTestId('table-caption')).toBeInTheDocument();
    });
  });
});
