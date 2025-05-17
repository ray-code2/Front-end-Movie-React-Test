import { render, screen, waitFor } from '@testing-library/react';
import MovieDetail from '../MovieDetail';
import { MemoryRouter } from 'react-router-dom';
import * as tmdb from '../../api/tmdb';


vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
    return {
        ...actual,
        useParams: () => ({
            id: '123',
        }),
        useNavigate: () => vi.fn(),
    };
});

vi.mock('../../api/tmdb', () => ({
    fetchMovieDetail: vi.fn(),
    fetchCredits: vi.fn(),
}));

describe('MovieDetail', () => {
    const mockMovie = {
        id: 123,
        title: 'Warfare',
        release_date: '2023-01-01',
        overview: 'This is a test movie.',
        poster_path: '/test.jpg',
    };

    const mockCredits = {
        cast: [
            { id: 1, name: 'Actor One', character: 'Hero' },
            { id: 2, name: 'Actor Two', character: 'Villain' },
        ],
        crew: [
            { name: 'Test Director', job: 'Director' },
        ],
    };

    beforeEach(() => {
        (tmdb.fetchMovieDetail as ReturnType<typeof vi.fn>).mockResolvedValue(mockMovie);
        (tmdb.fetchCredits as ReturnType<typeof vi.fn>).mockResolvedValue(mockCredits);
    });

    it('renders movie details', async () => {
        render(
            <MemoryRouter>
                <MovieDetail />
            </MemoryRouter>
        );

   
        expect(screen.getByText(/loading detail…/i)).toBeInTheDocument();


        await waitFor(() => {
            expect(screen.getByText(/Warfare/i)).toBeInTheDocument();
            expect(screen.getByText(/2023/i)).toBeInTheDocument();
            expect(screen.getByText(/this is a test movie/i)).toBeInTheDocument();
            expect(screen.getByText(/release date/i)).toBeInTheDocument();

            
            const directorLabel = screen.getByText(/Director:/i);
            expect(directorLabel.parentElement).toHaveTextContent(/Test Director/i);
        });

     
        expect(screen.getByText(/actor one as hero/i)).toBeInTheDocument();
        expect(screen.getByText(/actor two as villain/i)).toBeInTheDocument();
    });
});