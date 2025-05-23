# Search Functionality Implementation

This document outlines the implementation of the search functionality in the application.

## Overview

The search functionality has been standardized across the application to use the `/api/product/search?query=''` endpoint. This ensures consistent behavior and makes future updates easier to manage.

## Implementation Details

### 1. Search Utility Function

A utility function has been created in `src/utils/searchUtils.ts` to standardize search behavior:

```typescript
export const handleSearch = (
  value: string, 
  router: any, 
  callback?: () => void
): void => {
  if (!value.trim()) return;
  
  // Use the standardized search URL format with query parameter
  router.push(`/search-result?query=${encodeURIComponent(value)}`);
  
  // Execute callback if provided (e.g., close modal, clear input)
  if (callback) {
    callback();
  }
};
```

### 2. API Integration

The search functionality uses the following API endpoints:

- `/api/products/search?query=search_term` - For general search queries
- Additional parameters can be included for filtering (e.g., `page`, `page_size`, etc.)

### 3. Components Updated

The following components have been updated to use the standardized search functionality:

- `ModalSearch.tsx` - The search modal that appears when clicking the search icon
- `search-result/page.tsx` - The search results page
- `MenuOne.tsx` - The main menu component, including mobile search

### 4. How to Use

To implement search in a new component:

1. Import the search utility:
   ```typescript
   import { handleSearch } from '@/utils/searchUtils';
   ```

2. Create a state for the search keyword:
   ```typescript
   const [searchKeyword, setSearchKeyword] = useState('');
   ```

3. Use the utility in your component:
   ```typescript
   // For search button click
   <button onClick={() => handleSearch(searchKeyword, router, () => setSearchKeyword(''))}>
     Search
   </button>
   
   // For Enter key press in input
   <input
     value={searchKeyword}
     onChange={(e) => setSearchKeyword(e.target.value)}
     onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchKeyword, router, () => setSearchKeyword(''))}
   />
   ```

## Future Improvements

- Add search filters to the search results page
- Implement search suggestions
- Add search history functionality
