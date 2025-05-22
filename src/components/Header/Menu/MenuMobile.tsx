import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Add to existing imports and state
const [searchKeyword, setSearchKeyword] = useState('');
const router = useRouter();

const handleSearch = (value: string) => {
  if (!value.trim()) return;
  router.push(`/search-result?query=${encodeURIComponent(value)}`);
  setSearchKeyword('');
  handleMenuMobile(); // Close mobile menu after search
}

// Add this in the mobile search input area
<div className="form-search relative w-full h-12 mt-5">
  <input 
    type="text" 
    placeholder='Search products' 
    className='w-full h-full pl-4 pr-14 rounded-lg border border-line'
    value={searchKeyword}
    onChange={(e) => setSearchKeyword(e.target.value)}
    onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchKeyword)}
  />
  <button 
    className='absolute top-1/2 -translate-y-1/2 right-6 text-xl'
    onClick={() => handleSearch(searchKeyword)}
  >
    <Icon.MagnifyingGlass />
  </button>
</div>