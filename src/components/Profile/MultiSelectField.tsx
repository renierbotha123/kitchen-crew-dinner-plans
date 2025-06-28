
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface MultiSelectFieldProps {
  options: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export function MultiSelectField({ options, selectedValues, onChange, placeholder }: MultiSelectFieldProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const toggleOption = (option: string) => {
    if (selectedValues.includes(option)) {
      onChange(selectedValues.filter(value => value !== option));
    } else {
      onChange([...selectedValues, option]);
    }
  };

  const removeValue = (valueToRemove: string) => {
    onChange(selectedValues.filter(value => value !== valueToRemove));
  };

  const addCustomValue = () => {
    if (customInput.trim() && !selectedValues.includes(customInput.trim())) {
      onChange([...selectedValues, customInput.trim()]);
      setCustomInput('');
      setShowCustomInput(false);
    }
  };

  const availableOptions = options.filter(option => !selectedValues.includes(option));

  return (
    <div className="space-y-3">
      {/* Selected Values */}
      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedValues.map((value) => (
            <div
              key={value}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary font-[Jost]"
            >
              {value}
              <button
                onClick={() => removeValue(value)}
                className="ml-2 hover:bg-primary/20 rounded-full p-1"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Options Button */}
      <Button
        type="button"
        variant="outline"
        onClick={() => setShowOptions(!showOptions)}
        className="w-full justify-start font-[Jost]"
      >
        <Plus className="w-4 h-4 mr-2" />
        {selectedValues.length === 0 ? (placeholder || 'Select options') : 'Add more'}
      </Button>

      {/* Options List */}
      {showOptions && (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 space-y-2 bg-white dark:bg-gray-800">
          {availableOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => toggleOption(option)}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 font-[Jost] transition-colors"
            >
              {option}
            </button>
          ))}

          {/* Custom Input */}
          {!showCustomInput ? (
            <button
              type="button"
              onClick={() => setShowCustomInput(true)}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-primary font-[Jost] transition-colors"
            >
              + Add custom option
            </button>
          ) : (
            <div className="flex space-x-2">
              <Input
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder="Enter custom option"
                className="flex-1 font-[Jost]"
                onKeyPress={(e) => e.key === 'Enter' && addCustomValue()}
              />
              <Button size="sm" onClick={addCustomValue} disabled={!customInput.trim()}>
                Add
              </Button>
            </div>
          )}

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowOptions(false)}
            className="w-full mt-2 font-[Jost]"
          >
            Done
          </Button>
        </div>
      )}
    </div>
  );
}
