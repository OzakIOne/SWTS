import type { CategoryFilter } from '../utils/schemas';
import { categoryFilterList } from '../utils/schemas';

type CategoryTabProps = {
  selectedType: CategoryFilter;
  onChange: (type: CategoryFilter) => void;
};

export function CategoryTabs({ selectedType, onChange }: CategoryTabProps) {
  return (
    <div className="tabs tabs-boxed">
      {categoryFilterList.map((cat) => (
        <button
          key={cat}
          className={`tab ${selectedType === cat ? 'tab-active' : ''}`}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
