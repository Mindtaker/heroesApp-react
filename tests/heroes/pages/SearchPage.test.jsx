import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { SearchPage } from '../../../src/heroes';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  };
})

describe('SearchPage tests', () => {
  test('should show the default values', () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  test('should show Batman and the input element with the queryString value', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage />
      </MemoryRouter>
    );

    const inputValue = screen.getByRole('textbox').value;
    expect(inputValue).toBe('batman');

    const imgSrc = screen.getByRole('img').src;
    expect(imgSrc).toContain('batman');

    const alertSearch = screen.getByTestId('alert-search');
    expect(alertSearch.className).toContain('d-none');

    const alertNotFound = screen.getByTestId('alert-not-found');
    expect(alertNotFound.className).toContain('d-none');
  });

  test('should show an error if hero is not found', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman123']}>
        <SearchPage />
      </MemoryRouter>
    );

    const inputValue = screen.getByRole('textbox').value;
    expect(inputValue).toBe('batman123');

    const alertSearch = screen.getByTestId('alert-search');
    expect(alertSearch.className).toContain('d-none');

    const alertNotFound = screen.getByTestId('alert-not-found');
    expect(alertNotFound.className).not.toContain('d-none');
  });

  test('should call the navigate to new page', () => {
    render(
      <MemoryRouter initialEntries={['/search']}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'superman' } });

    const form = screen.getByTestId('search-form');
    fireEvent.submit(form);

    expect(mockNavigate).toHaveBeenCalledWith('?q=superman');
  });
});
