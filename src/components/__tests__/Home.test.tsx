import {render, screen} from '@testing-library/react';
import Home from '../Home';
import { BrowserRouter } from 'react-router-dom';

describe('Home', () => {
    test('renders without crashing', () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );
        expect(screen.getByText(/Movie Browser/i)).toBeInTheDocument();
    });
});