import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from '@testing-library/react';

import { InfiniteSpecies } from "./InfiniteSpecies";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false
        }
    }
});

const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient} >
        {children}
    </QueryClientProvider>
)

describe('Infinite Species rendering test', () => {
    it('should render Infinite Speices', () => {
        render(wrapper(<InfiniteSpecies />));
    });
});